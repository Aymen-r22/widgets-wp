# Image Component Documentation

## Overview

A responsive, optimized image component built on top of Next.js Image with advanced features including responsive sizing, loading states, skeleton animations, and client-side dimension tracking.

## Features

- ✅ **Responsive Sizing** - Supports breakpoint-based sizing with array notation
- 🎨 **Loading States** - Optional skeleton loading animation
- 🖼️ **Object Fit Control** - Support for cover/contain modes
- 📱 **Client-Safe Rendering** - Handles SSR/client hydration properly
- ⚡ **Performance Optimized** - Built on Next.js Image with quality control
- 🎯 **Flexible Positioning** - Customizable object positioning

## Usage

### Basic Usage

```jsx
import Image from '@/components/image/image';

<Image
  src="/path/to/image.jpg"
  alt="Description of image"
  sizes="50vw"
/>
```

### Responsive Sizing

```jsx
// Two breakpoints: desktop and mobile
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  sizes={[60, 90]} // 60vw on desktop, 90vw on mobile
/>

// Three breakpoints: desktop, tablet, mobile
<Image
  src="/gallery-image.jpg"
  alt="Gallery image"
  sizes={[33, 50, 90]} // 33vw desktop, 50vw tablet, 90vw mobile
/>
```

### With Loading Skeleton

```jsx
<Image
  src="/slow-loading-image.jpg"
  alt="Image with skeleton"
  sizes="100vw"
  skeleton={true}
/>
```

### Advanced Configuration

```jsx
<Image
  src="/product-image.jpg"
  alt="Product showcase"
  sizes={[40, 60, 100]}
  className="product-image"
  style={{ borderRadius: '8px' }}
  priority={true}
  quality={90}
  contain={true}
  position="top center"
  skeleton={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **Required** | Image source URL |
| `alt` | `string` | `'#'` | Alt text for accessibility |
| `sizes` | `string \| number \| number[]` | **Required** | Responsive sizes configuration |
| `className` | `string` | `''` | CSS class for the container |
| `style` | `object` | `undefined` | Inline styles for the container |
| `priority` | `boolean` | `false` | Next.js Image priority loading |
| `quality` | `number` | `80` | Image quality (1-100) |
| `contain` | `boolean` | `false` | Use object-fit: contain instead of cover |
| `position` | `string` | `'center'` | Object position (e.g., 'top center', 'bottom left') |
| `skeleton` | `boolean` | `false` | Show loading skeleton animation |

## Responsive Sizing Logic

The component uses a breakpoint system based on viewport width:

- **Desktop**: `vw >= 1024px` - Uses first size in array
- **Tablet**: `480px < vw <= 1024px` - Uses second size in array
- **Mobile**: `vw <= 480px` - Uses third size in array

### Size Array Examples

```jsx
// Single size - same on all devices
sizes={50} // 50vw everywhere

// Two sizes - desktop/mobile
sizes={[40, 80]} // 40vw desktop, 80vw mobile

// Three sizes - desktop/tablet/mobile  
sizes={[30, 50, 90]} // 30vw desktop, 50vw tablet, 90vw mobile

// String format
sizes="(min-width: 1024px) 40vw, (min-width: 480px) 60vw, 90vw"
```

## Styling

### CSS Module Classes

The component uses CSS modules with the following classes:

- `.imageSkeleton` - Loading skeleton with shimmer animation

### CSS Custom Properties

The skeleton animation uses CSS custom properties that should be defined in your global styles:

```css
:root {
  --bg-base: #f3f4f6;
  --bg-elevated: #e5e7eb;
}
```

### Custom Styling

```jsx
// Container styling
<Image
  src="/image.jpg"
  alt="Styled image"
  sizes="50vw"
  className="my-image-container"
  style={{
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '16/9'
  }}
/>
```

## Performance Considerations

### Loading States

The component handles loading states to prevent layout shift:

1. **Initial State**: Image opacity is 0
2. **Loading**: Skeleton animation (if enabled)
3. **Loaded**: Smooth transition to full opacity

### SSR/Hydration Safety

The component safely handles server-side rendering:

- Uses largest size during SSR to prevent layout shift
- Switches to responsive sizing after client hydration
- Tracks mount state to prevent hydration mismatches

### Next.js Image Integration

Built on Next.js Image for optimal performance:

- Automatic WebP/AVIF format selection
- Lazy loading by default (unless `priority={true}`)
- Responsive image generation
- Built-in optimization

## Examples

### WordPress ACF Integration

```jsx
// For WordPress ACF image fields
<Image
  src={acfImage.url}
  alt={acfImage.alt || 'Image'}
  sizes={[50, 70, 100]}
  skeleton={true}
/>
```

### Hero Section

```jsx
<div className="hero-section">
  <Image
    src="/hero-background.jpg"
    alt="Hero background"
    sizes="100vw"
    priority={true}
    quality={90}
    className="hero-image"
    style={{ aspectRatio: '16/9' }}
  />
</div>
```

### Product Gallery

```jsx
<div className="product-grid">
  {products.map(product => (
    <Image
      key={product.id}
      src={product.image}
      alt={product.name}
      sizes={[25, 50, 100]}
      skeleton={true}
      className="product-image"
    />
  ))}
</div>
```

### Profile Avatar

```jsx
<Image
  src={user.avatar}
  alt={`${user.name} avatar`}
  sizes="80px"
  contain={true}
  className="avatar"
  style={{
    width: '80px',
    height: '80px',
    borderRadius: '50%'
  }}
/>
```

## Dependencies

- `next/image` - Next.js optimized image component
- `react` - useState, useCallback, useEffect hooks
- `@/utils/store/store` - Dimensions store for viewport tracking

## Browser Support

- All modern browsers supporting Next.js
- Graceful degradation for older browsers
- Responsive images with srcset support

## Accessibility

- Always provide meaningful `alt` text
- Component maintains proper semantic structure
- Loading states don't interfere with screen readers

## Migration from Standard Next.js Image

```jsx
// Before (Next.js Image)
<NextImage
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  sizes="50vw"
/>

// After (Custom Image Component)
<Image
  src="/image.jpg"
  alt="Image"
  sizes="50vw"
  skeleton={true}
/>
```

## Troubleshooting

### Common Issues

**Hydration Mismatch**
- Component handles this automatically with `isMounted` state

**Skeleton Not Showing**
- Ensure CSS custom properties are defined
- Check that `skeleton={true}` is set

**Responsive Sizes Not Working**
- Verify dimensions store is properly configured
- Check breakpoint logic matches your design system

**Images Not Loading**
- Verify image URLs are accessible
- Check Next.js image domains configuration in `next.config.js`