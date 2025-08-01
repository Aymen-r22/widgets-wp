import { NextResponse } from 'next/server';

// Widget mapping to actual components
const WIDGET_MAP = {
  'hero': () => import('../../../sections/1-hero/hero.jsx'),
  'strategy': () => import('../../../sections/3-strategy/strategy.jsx'),
  'consume': () => import('../../../sections/4-consume/consume.jsx'),
  'centralize': () => import('../../../sections/5-centralize/centralize.jsx'),
  'contact': () => import('../../../sections/6-contact/contact.jsx')
};

export async function GET(request, { params }) {
  const { widget } = params;
  
  if (!WIDGET_MAP[widget]) {
    return NextResponse.json({ error: 'Widget not found' }, { status: 404 });
  }

  try {
    // Import the widget module
    const module = await WIDGET_MAP[widget]();
    
    // Extract the mount function - it should be available from the module
    const { mount } = module;
    
    if (!mount || typeof mount !== 'function') {
      throw new Error(`Mount function not found in ${widget} widget`);
    }
    
    // Create a JavaScript bundle that WordPress can consume
    // This is a simplified version - for production you'd need proper bundling
    const widgetBundle = `
(function() {
  'use strict';
  
  console.log('Loading ${widget} widget...');
  
  // Export the widget to global scope
  window.NextJSWidgets = window.NextJSWidgets || {};
  window.NextJSWidgets['${widget}'] = {
    mount: function(element, props) {
      try {
        console.log('Attempting to mount ${widget} widget with props:', props);
        
        // For now, create a simple test mount
        // In production, you'd need to properly bundle React components
        element.innerHTML = \`
          <div style="padding: 20px; border: 2px solid #007cba; background: #f0f8ff; border-radius: 8px; margin: 10px 0;">
            <h3 style="margin: 0 0 10px 0; color: #007cba;">✅ \${widget.toUpperCase()} Widget Loaded</h3>
            <p style="margin: 5px 0;"><strong>Status:</strong> Successfully loaded from API</p>
            <p style="margin: 5px 0;"><strong>Props received:</strong></p>
            <pre style="background: #f9f9f9; padding: 10px; border-radius: 4px; font-size: 12px; overflow: auto;">\${JSON.stringify(props, null, 2)}</pre>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">
              <strong>Note:</strong> This is a test mount. The actual React component would render here in production.
            </p>
          </div>
        \`;
        
        console.log('${widget} widget mounted successfully');
      } catch (error) {
        console.error('Error mounting ${widget} widget:', error);
        element.innerHTML = \`
          <div style="padding: 20px; border: 2px solid #dc3545; background: #f8d7da; border-radius: 8px; margin: 10px 0;">
            <h3 style="margin: 0 0 10px 0; color: #dc3545;">❌ Widget Mount Error</h3>
            <p style="margin: 5px 0;">Failed to mount ${widget} widget</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">Error: \${error.message}</p>
          </div>
        \`;
      }
    }
  };
  
  console.log('${widget} widget script loaded and registered');
})();
    `;
    
    return new Response(widgetBundle, {
      headers: {
        'Content-Type': 'application/javascript',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error serving widget:', error);
    return NextResponse.json({ error: 'Failed to load widget: ' + error.message }, { status: 500 });
  }
}