const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

/**
 * Fetch all pages from WordPress
 */
export async function fetchAllPages() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/pages?per_page=100&status=publish&orderby=menu_order&order=asc`);
    if (!response.ok) throw new Error('Failed to fetch pages');
    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Fetch a single page by slug
 */
export async function fetchPageBySlug(slug) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/pages?slug=${slug}&status=publish`);
    if (!response.ok) throw new Error('Failed to fetch page');
    const pages = await response.json();
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}