import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Widget mapping to their bundle files
const WIDGET_MAP = {
    'hero': 'widgets/hero-widget.js',
    // Add other widgets as they become available
};

export async function GET(request, { params }) {
    const { widget } = params;

    if (!WIDGET_MAP[widget]) {
        return NextResponse.json({ error: 'Widget not found' }, { status: 404 });
    }

    try {
        // Serve dynamic bundle that properly registers the widget globally
        const widgetBundle = `
(function() {
  'use strict';
  
  console.log('Loading ${widget} widget...');
  
  // Check if React is available, if not provide a fallback
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.warn('React or ReactDOM not found globally. Widget will render with basic HTML fallback.');
    
    // Fallback rendering without React
    window.NextJSWidgets = window.NextJSWidgets || {};
    window.NextJSWidgets['${widget}'] = {
      mount: function(element, props) {
        const {
          title = 'Courtier en électricité et gaz naturel pour les entreprises',
          subtitle = 'Réduisez durablement vos factures d\\'énergie grâce à notre expertise et nos solutions sur mesure pour les professionnels.',
          ctaText = 'Comparez les offres',
          rating = 4.8,
          consultantsLabel = 'Les Meilleurs Consultant'
        } = props || {};
        
        element.innerHTML = \`
          <section style="padding: 60px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); min-height: 500px; display: flex; align-items: center; font-family: system-ui, -apple-system, sans-serif;">
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 30px;">
                <div>
                  <h1 style="font-size: 3rem; font-weight: bold; line-height: 1.2; margin-bottom: 20px; color: #333;">\${title.replace(/<span class="highlight">(.*?)<\\/span>/g, '<span style="background: linear-gradient(135deg, #007cba, #0056b3); color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">$1</span>')}</h1>
                  <p style="font-size: 1.2rem; color: #666; line-height: 1.6;">\${subtitle}</p>
                </div>
                <button style="background: linear-gradient(135deg, #007cba, #0056b3); color: white; border: none; padding: 15px 30px; font-size: 1.1rem; font-weight: bold; border-radius: 8px; cursor: pointer; align-self: flex-start; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">\${ctaText}</button>
                <div style="display: flex; align-items: center; gap: 20px;">
                  <div style="display: flex; gap: 10px;">
                    <img src="/imgs/hero/person-1.jpg" alt="Consultant 1" style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <img src="/imgs/hero/person-2.jpg" alt="Consultant 2" style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <img src="/imgs/hero/person-3.jpg" alt="Consultant 3" style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <img src="/imgs/hero/person-5.jpg" alt="Consultant 4" style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  </div>
                  <div>
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">\${consultantsLabel}</div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="display: flex; gap: 2px;">
                        \${'★'.repeat(Math.floor(rating)).split('').map(star => \`<span style="color: #ffd700; font-size: 16px;">\${star}</span>\`).join('')}
                        \${'★'.repeat(5 - Math.floor(rating)).split('').map(star => \`<span style="color: #ffd700; font-size: 16px; opacity: 0.3;">\${star}</span>\`).join('')}
                      </div>
                      <span style="font-size: 0.9rem; color: #666;">\${rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="text-align: center;">
                <img src="/imgs/hero/cards.png" alt="Energy comparison cards" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
              </div>
            </div>
          </section>
        \`;
      }
    };
    console.log('${widget} widget loaded with HTML fallback');
    return;
  }
  
  // Hero component implementation (simplified for direct embedding)
  const HeroSection = function(props) {
    const {
      title = 'Courtier en <span class="highlight">électricité</span><br />et <span class="highlight">gaz naturel</span><br />pour les <span class="highlight">entreprises</span>',
      subtitle = 'Réduisez durablement vos factures d\\'énergie grâce à notre expertise et nos solutions sur mesure pour les professionnels.',
      ctaText = 'Comparez les offres',
      consultantImages = [
        { url: '/imgs/hero/person-1.jpg', alt: 'Consultant 1' },
        { url: '/imgs/hero/person-2.jpg', alt: 'Consultant 2' },
        { url: '/imgs/hero/person-3.jpg', alt: 'Consultant 3' },
        { url: '/imgs/hero/person-5.jpg', alt: 'Consultant 4' }
      ],
      rating = 4.8,
      consultantsLabel = 'Les Meilleurs Consultant',
      cardsImage = '/imgs/hero/cards.png',
      className = ''
    } = props || {};

    // Render stars
    const renderStars = () => {
      const fullStars = Math.floor(rating);
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          React.createElement('span', {
            key: i,
            style: { 
              color: '#ffd700',
              fontSize: '16px',
              opacity: i < fullStars ? 1 : 0.3 
            }
          }, '★')
        );
      }
      return stars;
    };

    // Parse title for highlighted text
    const renderTitle = () => {
      const parts = title.split(/<span class="highlight">(.*?)<\\/span>/g);
      const elements = [];
      
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          if (parts[i]) {
            elements.push(
              React.createElement('span', {
                key: i,
                dangerouslySetInnerHTML: { __html: parts[i] }
              })
            );
          }
        } else {
          elements.push(
            React.createElement('span', {
              key: i,
              style: {
                background: 'linear-gradient(135deg, #007cba, #0056b3)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }
            }, parts[i])
          );
        }
      }
      
      return elements;
    };

    return React.createElement('section', {
      className: 'hero-widget ' + className,
      style: {
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
    }, [
      React.createElement('div', {
        key: 'container',
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }
      }, [
        // Left content
        React.createElement('div', {
          key: 'left',
          style: { display: 'flex', flexDirection: 'column', gap: '30px' }
        }, [
          React.createElement('div', { key: 'heading' }, [
            React.createElement('h1', {
              key: 'title',
              style: {
                fontSize: '3rem',
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '20px',
                color: '#333'
              }
            }, renderTitle()),
            React.createElement('p', {
              key: 'subtitle',
              style: {
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6'
              }
            }, subtitle)
          ]),
          React.createElement('button', {
            key: 'cta',
            style: {
              background: 'linear-gradient(135deg, #007cba, #0056b3)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'transform 0.2s'
            },
            onMouseOver: function(e) { e.target.style.transform = 'translateY(-2px)'; },
            onMouseOut: function(e) { e.target.style.transform = 'translateY(0)'; }
          }, ctaText),
          React.createElement('div', {
            key: 'consultants',
            style: { display: 'flex', alignItems: 'center', gap: '20px' }
          }, [
            React.createElement('div', {
              key: 'avatars',
              style: { display: 'flex', gap: '10px' }
            }, consultantImages.slice(0, 4).map((img, index) =>
              React.createElement('img', {
                key: index,
                src: img.url,
                alt: img.alt,
                style: {
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              })
            )),
            React.createElement('div', { key: 'info' }, [
              React.createElement('div', {
                key: 'label',
                style: { fontSize: '0.9rem', color: '#666', marginBottom: '5px' }
              }, consultantsLabel),
              React.createElement('div', {
                key: 'rating',
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
              }, [
                React.createElement('div', {
                  key: 'stars',
                  style: { display: 'flex', gap: '2px' }
                }, renderStars()),
                React.createElement('span', {
                  key: 'text',
                  style: { fontSize: '0.9rem', color: '666' }
                }, rating + '/5')
              ])
            ])
          ])
        ]),
        // Right content
        React.createElement('div', {
          key: 'right',
          style: { textAlign: 'center' }
        }, [
          React.createElement('img', {
            key: 'cards',
            src: cardsImage,
            alt: 'Energy comparison cards',
            style: {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }
          })
        ])
      ])
    ]);
  };

  // Export the widget to global scope
  window.NextJSWidgets = window.NextJSWidgets || {};
  window.NextJSWidgets['${widget}'] = {
    mount: function(element, props) {
      try {
        console.log('Mounting ${widget} widget with props:', props);
        
        // Use React 18's createRoot if available, fallback to ReactDOM.render
        if (ReactDOM.createRoot) {
          const root = ReactDOM.createRoot(element);
          root.render(React.createElement(HeroSection, props));
          element._reactRoot = root;
        } else {
          ReactDOM.render(React.createElement(HeroSection, props), element);
        }
        
        console.log('${widget} widget mounted successfully');
      } catch (error) {
        console.error('Error mounting ${widget} widget:', error);
        element.innerHTML = '<div style="padding: 20px; border: 2px solid #dc3545; background: #f8d7da; border-radius: 8px; margin: 10px 0;">' +
          '<h3 style="margin: 0 0 10px 0; color: #dc3545;">❌ Widget Mount Error</h3>' +
          '<p style="margin: 5px 0;">Failed to mount ${widget} widget: ' + error.message + '</p>' +
        '</div>';
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