# Button Component Documentation

## Overview

A flexible, responsive button component with three distinct variants, icon support, and multiple size options. Built with CSS modules and responsive viewport units for consistent scaling across devices.

## Features

- ✅ **Three Variants** - None (outline), Primary (orange), Secondary (dark blue)
- 🎨 **Icon Support** - Left and right icons with flexible rendering
- 📱 **Responsive Design** - Viewport-based sizing with mobile breakpoints
- ⚡ **Performance Optimized** - CSS modules with hover transitions
- 🎯 **Flexible Sizing** - Four size options (xs, sm, md, lg)
- 🔧 **Customizable** - Custom styles, classes, and icon positioning

## Design System

Based on the project's CSS custom properties:

```css
:root {
  --bg: #FFF;
  --color-primary: #020F40;    /* Dark blue */
  --color-ac: #FC9900;         /* Orange */
  --text-primary: var(--color-primary);
  --text-ac: var(--color-ac);
  --text-contrast: var(--bg);  /* White text */
}
```

## Variants

### None (Default)
- **Background**: Transparent
- **Border**: Orange (`--color-ac`)
- **Text**: Orange (`--color-ac`)
- **Icons**: Orange
- **Hover**: Light orange background overlay

### Primary
- **Background**: Orange (`--color-ac`)
- **Border**: Orange (`--color-ac`)
- **Text**: White (`--text-contrast`)
- **Icons**: White
- **Hover**: Darker orange (#e6890a)

### Secondary
- **Background**: Dark blue (`--color-primary`)
- **Border**: Dark blue (`--color-primary`)
- **Text**: White (`--text-contrast`)
- **Icons**: White
- **Hover**: Darker blue (#041a5c)

## Usage

### Basic Usage

```jsx
import Button from '@/components/button/button';

// Default (none variant)
<Button>Click me</Button>

// Primary variant
<Button variant="primary">Primary Action</Button>

// Secondary variant
<Button variant="secondary">Secondary Action</Button>
```

### With Icons

```jsx
import { ArrowRight, Download, User } from 'lucide-react';

// Left icon
<Button leftIcon={User} variant="primary">
  Profile
</Button>

// Right icon
<Button rightIcon={ArrowRight} variant="none">
  Learn More
</Button>

// Both icons
<Button 
  leftIcon={Download} 
  rightIcon={ArrowRight}
  variant="secondary"
>
  Download Now
</Button>
```

### Size Variants

```jsx
// Extra small
<Button size="xs" variant="primary">Extra Small</Button>

// Small (default)
<Button size="sm" variant="primary">Small</Button>

// Medium
<Button size="md" variant="primary">Medium</Button>

// Large
<Button size="lg" variant="primary">Large</Button>
```

### Important State

```jsx
// Enhanced hover effects
<Button variant="primary" important>
  Important Action
</Button>
```

### Disabled State

```jsx
// Grayed out and non-interactive
<Button variant="primary" grayed>
  Disabled Button
</Button>
```

### Custom Styling

```jsx
<Button
  variant="primary"
  className="custom-button"
  style={{ marginTop: '20px' }}
  textStyle={{ fontWeight: 'bold' }}
  iconStyle={{ transform: 'rotate(45deg)' }}
>
  Custom Styled
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button text content |
| `variant` | `'none' \| 'primary' \| 'secondary'` | `'none'` | Button style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Button size |
| `leftIcon` | `ReactElement \| Component` | - | Icon displayed on the left |
| `rightIcon` | `ReactElement \| Component` | - | Icon displayed on the right |
| `important` | `boolean` | `false` | Enhanced hover effects |
| `grayed` | `boolean` | `false` | Disabled appearance and behavior |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `object` | `{}` | Inline styles for button container |
| `onClick` | `function` | - | Click event handler |

### Icon-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconStyle` | `object` | `{}` | Styles applied to all icons |
| `iconClassName` | `string` | `''` | CSS class applied to all icons |
| `leftIconStyle` | `object` | `{}` | Styles specific to left icon |
| `leftIconClassName` | `string` | `''` | CSS class specific to left icon |
| `rightIconStyle` | `object` | `{}` | Styles specific to right icon |
| `rightIconClassName` | `string` | `''` | CSS class specific to right icon |

### Text-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `textStyle` | `object` | `{}` | Styles applied to button text |
| `textClassName` | `string` | `''` | CSS class applied to button text |

## Examples

### WordPress CTA Sections

```jsx
// Hero section CTA
<Button 
  variant="primary" 
  size="lg"
  rightIcon={ArrowRight}
  onClick={() => window.location.href = '/contact'}
>
  Get Started Today
</Button>

// Secondary action
<Button 
  variant="none" 
  size="md"
  onClick={() => window.location.href = '/learn-more'}
>
  Learn More
</Button>
```

### Navigation Buttons

```jsx
// Header CTA
<Button variant="primary" size="sm">
  Contact Us
</Button>

// Footer newsletter signup
<Button 
  variant="secondary" 
  rightIcon={Mail}
  onClick={handleNewsletterSignup}
>
  Subscribe
</Button>
```

### Form Actions

```jsx
// Primary form submission
<Button 
  variant="primary" 
  size="md"
  type="submit"
  leftIcon={CheckCircle}
>
  Submit Form
</Button>

// Cancel action
<Button 
  variant="none" 
  size="md"
  onClick={handleCancel}
>
  Cancel
</Button>
```

### Loading States

```jsx
import { Loader2 } from 'lucide-react';

// Loading button
<Button 
  variant="primary" 
  leftIcon={Loader2}
  leftIconStyle={{ animation: 'spin 1s linear infinite' }}
  grayed={isLoading}
>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
```

### Icon Combinations

```jsx
// Download with arrow
<Button 
  variant="secondary"
  leftIcon={Download}
  rightIcon={ArrowDown}
  size="md"
>
  Download PDF
</Button>

// External link
<Button 
  variant="none"
  rightIcon={ExternalLink}
  onClick={() => window.open('https://example.com', '_blank')}
>
  Visit Website
</Button>
```

## Responsive Behavior

The button automatically scales based on viewport width:

### Desktop (>1024px)
- Base padding and font sizes
- Icons: 1.25vw

### Tablet (600px - 1024px)
- Increased padding: 0.98vw 1.95vw
- Larger text: 1.56vw
- Icons: 2.34vw

### Mobile (<600px)
- Maximum padding: 2.54vw 5.09vw
- Largest text: 4.07vw
- Icons: 6.11vw

## Accessibility

- Semantic `<button>` element
- Proper focus states with hover effects
- Disabled state prevents interaction
- Icons inherit color for proper contrast
- Keyboard navigation support

## Icon Integration

The component supports two types of icons:

### React Elements (JSX)
```jsx
<Button leftIcon={<ArrowRight />}>
  With JSX Icon
</Button>
```

### Component References
```jsx
import { ArrowRight } from 'lucide-react';

<Button leftIcon={ArrowRight}>
  With Component Reference
</Button>
```

## CSS Custom Properties

Ensure these variables are defined in your global CSS:

```css
:root {
  --color-primary: #020F40;  /* Secondary button background */
  --color-ac: #FC9900;       /* Primary button and none variant colors */
  --text-contrast: #FFF;     /* Text color for filled buttons */
}
```

## Best Practices

### Variant Usage
- **None**: Secondary actions, links, less important CTAs
- **Primary**: Main actions, form submissions, primary CTAs
- **Secondary**: Alternative primary actions, navigation buttons

### Size Guidelines
- **xs/sm**: Navigation, inline actions, compact spaces
- **md**: Standard form buttons, content CTAs
- **lg**: Hero sections, prominent calls-to-action

### Icon Guidelines
- Use consistent icon library (e.g., Lucide React)
- Keep icons simple and recognizable
- Ensure icons support the button's purpose
- Consider icon-only buttons for space-constrained areas

## WordPress Integration

Perfect for ACF button fields:

```jsx
// ACF button field structure
const buttonData = {
  text: "Get Started",
  url: "/contact",
  variant: "primary",
  icon: "arrow-right"
};

// Component usage
<Button 
  variant={buttonData.variant}
  rightIcon={getIcon(buttonData.icon)}
  onClick={() => window.location.href = buttonData.url}
>
  {buttonData.text}
</Button>
```

## Browser Support

- All modern browsers
- CSS custom properties support required
- Graceful degradation for older browsers
- Responsive viewport units (vw) support