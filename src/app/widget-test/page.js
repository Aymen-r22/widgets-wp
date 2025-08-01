'use client';

import { useEffect } from 'react';
import { HeroSection, mount } from '../../sections/1-hero/hero';

export default function WidgetTestPage() {
    useEffect(() => {
        // Test different prop configurations
        const testConfigs = [
            {
                title: 'Test 1 - Basic <span class="highlight">Configuration</span>',
                subtitle: 'This is a test of the basic widget configuration',
                ctaText: 'Test Button 1',
                rating: 4.5
            },
            {
                title: 'Test 2 - Custom <span class="highlight">Images</span> and <span class="highlight">Rating</span>',
                subtitle: 'Testing with different consultant images and rating',
                ctaText: 'Custom CTA',
                consultantImages: [
                    { url: '/imgs/hero/person-1.jpg', alt: 'Test Consultant 1' },
                    { url: '/imgs/hero/person-2.jpg', alt: 'Test Consultant 2' }
                ],
                rating: 5.0,
                consultantsLabel: 'Test Consultants'
            },
            {
                title: 'Test 3 - <span class="highlight">Minimal</span> Configuration',
                subtitle: 'Testing with minimal props',
                ctaText: 'Minimal Test'
            }
        ];

        // Mount test widgets
        testConfigs.forEach((config, index) => {
            const element = document.getElementById(`widget-test-${index + 1}`);
            if (element) {
                mount(element, config);
            }
        });
    }, []);

    return (
        <>
            <div style={{ padding: '20px' }}>
                <h1>Widget Testing Page</h1>
                <p>This page tests the Hero widget with different configurations.</p>

                <div style={{ marginBottom: '40px' }}>
                    <h2>Test 1: React Component (Direct)</h2>
                    <HeroSection
                        title="Direct React - <span class='highlight'>Component</span> Test"
                        subtitle="This is rendered directly as a React component"
                        ctaText="Direct Render"
                        rating={4.2}
                    />
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h2>Test 2: Mount Function Test 1</h2>
                    <div id="widget-test-1" style={{ border: '2px dashed #ccc', minHeight: '400px' }}>
                        Loading widget...
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h2>Test 3: Mount Function Test 2</h2>
                    <div id="widget-test-2" style={{ border: '2px dashed #ccc', minHeight: '400px' }}>
                        Loading widget...
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h2>Test 4: Mount Function Test 3</h2>
                    <div id="widget-test-3" style={{ border: '2px dashed #ccc', minHeight: '400px' }}>
                        Loading widget...
                    </div>
                </div>

                <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                    <h3>Widget Testing Instructions</h3>
                    <ul>
                        <li>Test 1 shows the component rendered directly as a React component</li>
                        <li>Tests 2-4 show the component mounted using the mount function (WordPress-style)</li>
                        <li>Each test uses different prop configurations to verify flexibility</li>
                        <li>Check browser console for any errors or warnings</li>
                        <li>Verify hot reloading works when you modify the component</li>
                    </ul>
                </div>
            </div>
        </>
    );
}