'use client';

import React from 'react'
import NextImage from 'next/image'
import styles from './hero.module.css'
import Button from '../../components/button/button'
import MarkedText from '../../components/markedText/markedText'
import { OffreIcon, StarIcon } from '../../components/icons/icons'
import { WidgetErrorBoundary, validateProps, sanitizeHtml, createMountFunction, devAutoMount } from '../../lib/widget-utils'

// Prop validation schema
const HERO_PROP_SCHEMA = {
  title: {
    type: 'string',
    default: 'Courtier en <span class="highlight">électricité</span><br />et <span class="highlight">gaz naturel</span><br />pour les <span class="highlight">entreprises</span>'
  },
  subtitle: {
    type: 'string',
    default: 'Réduisez durablement vos factures d\'énergie grâce à notre expertise et nos solutions sur mesure pour les professionnels.'
  },
  ctaText: {
    type: 'string',
    default: 'Comparez les offres'
  },
  consultantImages: {
    type: 'array',
    itemType: 'object',
    default: [
      { url: '/imgs/hero/person-1.jpg', alt: 'Consultant 1' },
      { url: '/imgs/hero/person-2.jpg', alt: 'Consultant 2' },
      { url: '/imgs/hero/person-3.jpg', alt: 'Consultant 3' },
      { url: '/imgs/hero/person-5.jpg', alt: 'Consultant 4' }
    ]
  },
  rating: {
    type: 'number',
    min: 0,
    max: 5,
    default: 4.8
  },
  consultantsLabel: {
    type: 'string',
    default: 'Les Meilleurs Consultant'
  },
  cardsImage: {
    type: 'string',
    default: '/imgs/hero/cards.png'
  },
  className: {
    type: 'string',
    default: ''
  }
};

// Widget-compatible Hero component
export function HeroSection(props = {}) {
  const validatedProps = validateProps(props, HERO_PROP_SCHEMA);
  const {
    title,
    subtitle,
    ctaText,
    consultantImages,
    rating,
    consultantsLabel,
    cardsImage,
    className
  } = validatedProps;

  // Parse title for MarkedText components
  const renderTitle = () => {
    const sanitizedTitle = sanitizeHtml(title);
    
    // Simple parsing for highlighted text - in production, use a proper HTML parser
    const parts = sanitizedTitle.split(/<span class="highlight">(.*?)<\/span>/g);
    const elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular text (may contain <br /> tags)
        if (parts[i]) {
          elements.push(
            <span key={i} dangerouslySetInnerHTML={{ __html: parts[i] }} />
          );
        }
      } else {
        // Highlighted text
        elements.push(
          <MarkedText key={i} variant={i === 1 ? "large" : "default"}>
            {parts[i]}
          </MarkedText>
        );
      }
    }
    
    return elements;
  };

  // Generate star rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          style={{ 
            opacity: i < fullStars ? 1 : 0.3 
          }} 
        />
      );
    }
    
    return stars;
  };
    return (
        <WidgetErrorBoundary>
            <section className={`${styles.hero} ${className}`}>
                {/* Background Image */}
                <div className={styles.backgroundImage}></div>

                {/* Hero Content */}
                <div className={styles.container}>
                    <div className={styles.content}>
                        {/* Left Content */}
                        <div className={styles.leftContent}>
                            {/* Main Heading */}
                            <div className={styles.headingSection}>
                                <h1 className={styles.mainHeading}>
                                    {renderTitle()}
                                </h1>

                                <p className={styles.subheading}>
                                    {subtitle}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <Button
                                variant="primary"
                                leftIcon={OffreIcon}
                                className={styles.ctaButton}
                                size="lg"
                            >
                                {ctaText}
                            </Button>

                            {/* Consultants Section */}
                            <div className={styles.consultantsSection}>
                                <div className={styles.avatarsContainer}>
                                    {consultantImages.map((img, index) => (
                                        <div key={index} className={styles.avatar}>
                                            <NextImage
                                                src={img.url}
                                                alt={img.alt}
                                                width={70}
                                                height={70}
                                                className={styles.avatarImage}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.consultantsInfo}>
                                    <div className={styles.consultantsText}>
                                        <span className={styles.consultantsLabel}>{consultantsLabel}</span>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className={styles.stars}>
                                            {renderStars()}
                                        </div>
                                        <span className={styles.ratingText}>{rating}/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Comparison Cards */}
                        <div className={styles.rightContent}>
                            <div className={styles.cardsContainer}>
                                <NextImage
                                    src={cardsImage}
                                    alt="Energy comparison cards"
                                    width={440}
                                    height={472}
                                    className={styles.cardsImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </WidgetErrorBoundary>
    )
}

// Mount function for WordPress/Elementor
export const mount = createMountFunction(HeroSection, HERO_PROP_SCHEMA);

// Development auto-mount for testing
devAutoMount('hero-dev-root', mount, {
  title: 'DEV MODE - Courtier en <span class="highlight">électricité</span><br />et <span class="highlight">gaz naturel</span>',
  subtitle: 'Mode développement - Testez vos modifications en temps réel',
  ctaText: 'Test CTA',
  consultantImages: [
    { url: '/imgs/hero/person-1.jpg', alt: 'Dev Consultant 1' },
    { url: '/imgs/hero/person-2.jpg', alt: 'Dev Consultant 2' }
  ],
  rating: 4.9,
  consultantsLabel: 'Dev Mode Consultants'
});

// Default export for backward compatibility
export default function Hero() {
    return <HeroSection />;
}
