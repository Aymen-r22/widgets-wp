/**
 * Hero Widget Entry Point
 * 
 * This file exports the Hero component and mount function for WordPress/Elementor consumption.
 * The widget is built as a UMD bundle that can be loaded by WordPress.
 */

import { HeroSection, mount } from '../sections/1-hero/hero';

// Widget metadata
const metadata = {
  name: 'HeroSection',
  version: '1.0.0',
  description: 'Hero section widget with customizable title, subtitle, CTA, consultant images, and rating',
  author: 'Next.js Widget System',
  props: {
    title: {
      type: 'string',
      description: 'Main heading with HTML support for highlighting',
      default: 'Courtier en électricité et gaz naturel'
    },
    subtitle: {
      type: 'string', 
      description: 'Subtitle text below the main heading',
      default: 'Réduisez durablement vos factures d\'énergie...'
    },
    ctaText: {
      type: 'string',
      description: 'Call-to-action button text',
      default: 'Comparez les offres'
    },
    consultantImages: {
      type: 'array',
      description: 'Array of consultant image objects with url and alt properties',
      default: []
    },
    rating: {
      type: 'number',
      description: 'Rating value (0-5)',
      default: 4.8
    },
    consultantsLabel: {
      type: 'string',
      description: 'Label text for consultants section',
      default: 'Les Meilleurs Consultant'
    },
    cardsImage: {
      type: 'string',
      description: 'URL for the comparison cards image',
      default: '/imgs/hero/cards.png'
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes',
      default: ''
    }
  }
};

// Initialize widget when loaded
if (typeof window !== 'undefined') {
  // Register widget globally for WordPress consumption
  window.NextJSWidgets = window.NextJSWidgets || {};
  window.NextJSWidgets.hero = {
    HeroSection,
    mount,
    metadata
  };
  
  console.log('Hero widget registered globally');
}

// Export for ES module consumption
export { HeroSection, mount, metadata };

// Default export for UMD bundle
const HeroWidget = {
  HeroSection,
  mount,
  metadata
};

export default HeroWidget;