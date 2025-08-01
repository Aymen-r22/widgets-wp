# 🧱 Next.js + WordPress Headless Static Website

This project is a **fully static** SEO-focused website built with **Next.js** (JavaScript) and **WordPress** as a headless CMS.

---

## 📌 Features

- ✅ Static generation with `getStaticProps` + `getStaticPaths`
- 🧩 Reusable **section-based** components (hero, features, CTA, etc.)
- ⚙️ WordPress **Flexible Content** via ACF Pro
- 🚀 Auto rebuild via webhook when content updates
- 🖼️ Images fetched from WordPress and rendered via `next/image`
- 🎯 Ideal for marketing/landing pages that need SEO & CMS

---

## 🛠 Tech Stack

- **Frontend**: Next.js (JavaScript only)
- **CMS**: WordPress + ACF Pro
- **Hosting**: Vercel (recommended)
- **Trigger**: WP Webhook → Vercel Deploy Hook

---

## 📁 Project Structure

```
/components
  /sections → Individual reusable sections
/lib
  api.js → Fetch pages + ACF data
  renderSections.js → Maps section type to component
/pages
  [slug].js → Dynamic static page route
/public/ → Static assets
next.config.js → Image domains config
```

## 🧱 WordPress Setup

### ✅ Plugins Required

- [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/)
- [WP Webhooks](https://wp-webhooks.com/)
- (Optional) [WPGraphQL](https://www.wpgraphql.com/)

### 📐 ACF Flexible Content

1. Create a field group for `pages`
2. Add a **Flexible Content** field: `sections`
3. Define layouts:
   - `hero`: title, subtitle, background_image
   - `features`: repeater (title, description)
   - `cta`: heading, button_link
4. Assign to Page post type

### 🔄 WP Webhook Trigger

1. Create a deploy hook in Vercel
2. Store the URL in a WP Option (`vercel_build_hook_url`)
3. Hook into `save_post` to trigger the deploy on page publish:

```php
function trigger_nextjs_build($post_ID, $post) {
    if ($post->post_status === 'publish' && $post->post_type === 'page') {
        $hook_url = get_option('vercel_build_hook_url');
        if ($hook_url) wp_remote_post($hook_url);
    }
}
add_action('save_post', 'trigger_nextjs_build', 10, 2);
```

---

## 🔌 Next.js Implementation

### 📦 Static Generation

**`/pages/[slug].js`**

```javascript
export async function getStaticPaths() {
  const pages = await fetchAllPages();
  const paths = pages.map(page => ({ params: { slug: page.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const page = await fetchPageBySlug(params.slug);
    const acfData = await fetchPageACFData(page.id);
    return { props: { page, acfData }, revalidate: false };
  } catch {
    return { props: { error: true } };
  }
}
```

### 🧠 API Layer (`/lib/api.js`)

```javascript
export async function fetchAllPages() { ... }
export async function fetchPageBySlug(slug) { ... }
export async function fetchPageACFData(pageId) { ... }
```

### 🧱 Section Renderer (`/lib/renderSections.js`)

```javascript
import HeroSection from '../components/sections/HeroSection';
...

export default function renderSections(sections) {
  return sections.map((section, i) => {
    switch (section.acf_fc_layout) {
      case 'hero': return <HeroSection key={i} {...section} />;
      ...
    }
  });
}
```

### 🧩 Component Example: `HeroSection.js`

```javascript
import Image from 'next/image';

export default function HeroSection({ title, subtitle, background_image }) {
  return (
    <section className="hero">
      {background_image?.url && (
        <Image 
          src={background_image.url} 
          alt="" 
          width={1920} 
          height={800} 
          layout="responsive" 
        />
      )}
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}
```

### 🖼️ `next.config.js`

```javascript
module.exports = {
  images: {
    domains: ['your-wordpress-domain.com'],
  },
};
```

## 📁 Project Structure

```
├── components/
│   ├── sections/
│   │   ├── HeroSection.js
│   │   ├── FeaturesSection.js
│   │   └── CTASection.js
│   └── layout/
│       ├── Header.js
│       └── Footer.js
├── lib/
│   ├── api.js              # WordPress API functions
│   ├── renderSections.js   # Section renderer utility
│   └── figma.js           # Figma MCP integration (optional)
├── pages/
│   ├── [slug].js          # Dynamic page routes
│   ├── index.js           # Homepage
│   └── _app.js            # App configuration
├── styles/
│   ├── globals.css
│   └── components/
├── public/
│   └── images/
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
└── package.json
```

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 🚀 Deployment

**Recommended: Vercel**

1. Link your GitHub project to Vercel
2. Add your WordPress API URL in env:
   ```
   WORDPRESS_API_URL=https://yourdomain.com
   ```
3. Add a Deploy Hook URL in WP and link to `save_post` (see above)
4. On content update → WordPress triggers Vercel → Next.js rebuilds

---

## 📝 Content Management Workflow

| Action | WordPress | Effect on Next.js site |
|--------|-----------|------------------------|
| Add/edit a page | Use WP Admin + ACF | Triggers rebuild via webhook |
| Create a new section | Add new layout in ACF | Add component + render case |
| Update media | Use Media Library | Next fetch pulls latest |

---

## 🧠 Best Practices

- Keep section components modular & isolated
- Use `next/image` for performance
- Add global SEO meta in `_document.js` or per-page `<Head>`
- Don't rely on WordPress runtime fetch—build only

---

## 🧼 Future Ideas

- Preview mode for draft content
- i18n with WPML or Polylang
- Admin UI preview for each section
- Figma-to-component via AI/Figma MCP

---

## 🏁 Done ✅

- Static site with dynamic pages
- Section-based content via ACF
- Automatic builds on WP updates
- SEO ready and fast load

