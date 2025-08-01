"use client";

import styles from './image.module.css'
import { useState, useCallback, useEffect } from 'react';
import NextImage from 'next/image';
import { useDimensions } from '../../hooks/useDimensions';

const Image = ({
    sizes,
    src,
    alt = '#',
    className = '',
    style,
    priority = false,
    quality = 80,
    contain,
    position,
    skeleton = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    // Track client-side mounting
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const handleLoadingComplete = useCallback(() => {
        setIsLoaded(true);
    }, []);

    // Simplified size determination for now
    let effectiveSize = sizes;
    if (Array.isArray(sizes)) {
        effectiveSize = sizes[0]; // Use first size for now
    }

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                display: 'flex',
                ...style
            }}
        >
            <NextImage
                src={src}
                alt={alt}
                fill
                sizes={typeof effectiveSize === 'number' ? effectiveSize + 'vw' : effectiveSize}
                style={{
                    flex: 1,
                    objectFit: contain ? 'contain' : 'cover',
                    objectPosition: position || 'center',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'none',
                    borderRadius: 'inherit'
                }}
                onLoad={handleLoadingComplete}
                quality={quality}
                priority={priority}
            />

            {skeleton && (
                <div
                    className={styles.imageSkeleton}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: !isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                />
            )}
        </div>
    );
};

export default Image;