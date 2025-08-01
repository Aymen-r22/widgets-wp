# Next.js WordPress Widgets

This directory contains widget entry points for WordPress/Elementor integration. The widgets allow you to use Next.js components within WordPress/Elementor while maintaining full styling and functionality.

## Available Widgets

### HeroSection Widget
- **File**: `hero-widget.js`
- **Component**: `HeroSection`
- **Description**: Hero section with customizable title, subtitle, CTA button, consultant images, and rating

## Widget Structure

Each widget file exports:
- **Component**: The React component function
- **Mount function**: For WordPress DOM mounting
- **Metadata**: Widget information and prop definitions

## Development Workflow

### 1. Local Development
```bash
# Start development server
npm run dev

# Visit widget test page
http://localhost:3000/widget-test
```

### 2. Testing Widgets
- Use `/widget-test` page to test different prop configurations
- Modify components and see hot reloading in action
- Check browser console for validation warnings

### 3. Building for Production
```bash
# Build the project
npm run build

# Widget components are included in the build output
```

## WordPress Integration

### Component Props Interface

#### HeroSection Props
```typescript
interface HeroWidgetProps {
  title?: string;           // HTML string with <span class="highlight"> support
  subtitle?: string;        // Plain text subtitle
  ctaText?: string;         // Button text
  consultantImages?: Array<{
    url: string;
    alt: string;
  }>;
  rating?: number;          // 0-5 rating value
  consultantsLabel?: string; // Label for consultants section
  cardsImage?: string;      // URL for comparison cards image
  className?: string;       // Additional CSS classes
}
```

### WordPress Usage Example

```php
// In your WordPress widget PHP file
protected function render() {
  $settings = $this->get_settings_for_display();
  
  $props = [
    'title' => $settings['title'] ?? '',
    'subtitle' => $settings['subtitle'] ?? '',
    'ctaText' => $settings['button_text'] ?? '',
    'consultantImages' => array_map(function($img) {
      return [
        'url' => $img['url'] ?? '',
        'alt' => $img['alt'] ?? ''
      ];
    }, $settings['consultant_images'] ?? []),
    'rating' => floatval($settings['rating'] ?? 4.8)
  ];
  
  echo '<div 
    data-nextjs-widget="HeroSection"
    data-widget-props="'.esc_attr(wp_json_encode($props)).'"
  ></div>';
}
```

### JavaScript Loading (WordPress)

```javascript
// Load and mount the widget
async function loadNextJSWidget(widgetName, element, props) {
  try {
    // In production, load from your Next.js deployment
    const module = await import(`https://your-nextjs-app.vercel.app/widgets/${widgetName}.js`);
    
    if (module.mount) {
      module.mount(element, props);
    } else {
      console.error(`Widget ${widgetName} does not export a mount function`);
    }
  } catch (error) {
    console.error(`Failed to load widget ${widgetName}:`, error);
    element.innerHTML = '<div class="widget-error">Widget failed to load</div>';
  }
}

// Auto-mount all widgets on page load
document.addEventListener('DOMContentLoaded', function() {
  const widgets = document.querySelectorAll('[data-nextjs-widget]');
  
  widgets.forEach(element => {
    const widgetName = element.dataset.nextjsWidget;
    const props = JSON.parse(element.dataset.widgetProps || '{}');
    
    loadNextJSWidget(widgetName, element, props);
  });
});
```

## Prop Validation

All widgets include automatic prop validation:
- **Type checking**: Ensures props are correct types
- **Default values**: Fallback to sensible defaults
- **Sanitization**: Cleans HTML content and URLs
- **Constraints**: Applies min/max values where applicable

## Error Handling

Widgets include comprehensive error handling:
- **Mount failures**: Display error message instead of breaking page
- **Invalid props**: Log warnings and use defaults
- **Component errors**: Graceful fallback UI
- **Development mode**: Detailed error information in console

## Deployment

### Next.js App Deployment
1. Deploy your Next.js app to Vercel, Netlify, or similar
2. Ensure widgets are accessible at: `https://your-app.com/widgets/[widget-name].js`

### WordPress Integration
1. Install widget PHP files in your WordPress theme/plugin
2. Update widget loading URLs to point to your deployed Next.js app
3. Test widgets in Elementor editor

## Troubleshooting

### Widget Not Loading
- Check browser console for 404 errors on widget bundle
- Verify widget export interface (component + mount function)
- Ensure CORS headers allow WordPress domain

### Styling Issues
- CSS modules are included in the widget bundles
- Verify no CSS conflicts with WordPress theme
- Check that images and assets load correctly

### Props Not Working
- Validate prop structure matches interface
- Check browser console for validation warnings
- Ensure JSON encoding is correct in PHP

## Adding New Widgets

1. **Create Component**: Transform existing section to accept props
2. **Add Validation**: Define prop schema with types and defaults
3. **Create Entry Point**: Add widget file in `src/widgets/`
4. **Update Config**: Add to webpack configuration (if using custom build)
5. **Test**: Use `/widget-test` page to verify functionality
6. **Document**: Update this README with new widget information