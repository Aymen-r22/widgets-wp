'use client';

import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Validates and sanitizes widget props
 * @param {Object} props - Raw props from WordPress
 * @param {Object} schema - Validation schema
 * @returns {Object} Validated props
 */
export function validateProps(props, schema) {
    const validated = {};

    for (const [key, config] of Object.entries(schema)) {
        const value = props[key];

        if (value === undefined || value === null) {
            validated[key] = config.default;
            continue;
        }

        try {
            switch (config.type) {
                case 'string':
                    validated[key] = sanitizeString(String(value));
                    break;
                case 'number':
                    const numValue = Number(value);
                    if (isNaN(numValue)) {
                        console.warn(`Invalid number value for ${key}:`, value);
                        validated[key] = config.default;
                    } else {
                        // Apply min/max constraints if defined
                        let finalValue = numValue;
                        if (config.min !== undefined) finalValue = Math.max(config.min, finalValue);
                        if (config.max !== undefined) finalValue = Math.min(config.max, finalValue);
                        validated[key] = finalValue;
                    }
                    break;
                case 'array':
                    if (Array.isArray(value)) {
                        validated[key] = value.map(item => {
                            if (config.itemType === 'object' && typeof item === 'object') {
                                return sanitizeObject(item);
                            }
                            return item;
                        });
                    } else {
                        console.warn(`Invalid array value for ${key}:`, value);
                        validated[key] = config.default;
                    }
                    break;
                case 'boolean':
                    validated[key] = Boolean(value);
                    break;
                default:
                    validated[key] = value;
            }
        } catch (error) {
            console.warn(`Error validating prop ${key}:`, error);
            validated[key] = config.default;
        }
    }

    return validated;
}

/**
 * Sanitizes string values
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.trim();
}

/**
 * Sanitizes object values (for consultant images, etc.)
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
function sanitizeObject(obj) {
    const sanitized = {};

    if (obj.url) {
        sanitized.url = sanitizeString(obj.url);
    }
    if (obj.alt) {
        sanitized.alt = sanitizeString(obj.alt);
    }
    if (obj.width) {
        sanitized.width = Number(obj.width) || undefined;
    }
    if (obj.height) {
        sanitized.height = Number(obj.height) || undefined;
    }

    return sanitized;
}

/**
 * Sanitizes HTML content to prevent XSS
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHtml(html) {
    if (typeof html !== 'string') return '';

    // Basic HTML sanitization - in production, use DOMPurify
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
}

/**
 * Creates a generic mount function for widgets
 * @param {React.Component} Component - React component to mount
 * @param {Object} propSchema - Prop validation schema
 * @returns {Function} Mount function
 */
export function createMountFunction(Component, propSchema = {}) {
    return function mount(element, props = {}) {
        try {
            if (!element) {
                throw new Error('Mount element not found');
            }

            const validatedProps = validateProps(props, propSchema);

            // Use React 19's createRoot API
            const root = createRoot(element);
            root.render(React.createElement(Component, validatedProps));

            // Store root on element for potential cleanup
            element._reactRoot = root;
        } catch (error) {
            console.error('Failed to mount widget:', error);
            if (element) {
                element.innerHTML = '<div class="widget-error" style="padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px;">Widget failed to load. Please check console for details.</div>';
            }
        }
    };
}

/**
 * Error boundary component for widgets
 */
export function WidgetErrorBoundary({ children }) {
    // For now, just return children without error boundary
    // In production, implement proper error boundary
    return children;
}

/**
 * Development auto-mount helper
 * @param {string} elementId - ID of element to mount to
 * @param {Function} mountFunction - Widget mount function
 * @param {Object} testProps - Props for testing
 */
export function devAutoMount(elementId, mountFunction, testProps = {}) {
    // Only run in development and in browser environment
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                mountFunction(element, testProps);
            }
        }, 0);
    }
}