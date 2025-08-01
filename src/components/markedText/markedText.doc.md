# MarkedText Component

A reusable React component that adds an orange rounded background highlight behind text content, perfect for emphasizing important words or phrases.

## Features

- ✨ Orange rounded background highlight
- 🎨 Inherits font properties (size, weight, family) from parent
- 📱 Responsive design with mobile optimizations
- 🔧 Support for custom className and inline styles
- 🎯 Multiple size variants (small, default, large)
- ♿ Accessible and semantic HTML

## Usage

```jsx
import MarkedText from '@/components/markedText/markedText';

// Basic usage
<div>
  Courtier en <MarkedText>électricité</MarkedText> et gaz naturel
</div>

// With custom styling
<MarkedText 
  className="custom-class" 
  style={{ fontWeight: 'bold' }}
>
  highlighted text
</MarkedText>

// Different variants
<MarkedText variant="large">Large highlight</MarkedText>
<MarkedText variant="small">Small highlight</MarkedText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The text content to highlight (required) |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `style` | `object` | `{}` | Inline styles to apply to the component |
| `variant` | `'small' \| 'default' \| 'large'` | `'default'` | Size variant of the highlight |

## Variants

- **small**: Compact highlight with 16px border radius
- **default**: Standard highlight with 20px border radius  
- **large**: Prominent highlight with 37px border radius

## Styling

The component uses CSS Modules for styling and inherits font properties from its parent element. The orange background color (`#fc9900`) matches the design system.

### Custom Styling

You can customize the appearance using:

1. **className prop**: Add custom CSS classes
2. **style prop**: Apply inline styles
3. **CSS custom properties**: Override default values

## Examples

### In a heading
```jsx
<h1 style={{ fontSize: '80px', fontFamily: 'Work Sans' }}>
  Courtier en <MarkedText>électricité</MarkedText>
</h1>
```

### In a paragraph
```jsx
<p>
  Solutions sur mesure pour les <MarkedText variant="small">entreprises</MarkedText>
</p>
```

### With custom styling
```jsx
<MarkedText 
  className="my-custom-class"
  style={{ textTransform: 'uppercase' }}
  variant="large"
>
  Custom styled text
</MarkedText>
``` 