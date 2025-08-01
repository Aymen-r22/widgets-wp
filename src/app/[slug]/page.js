import { fetchAllPages, fetchPageBySlug } from '../../lib/api'
import { notFound } from 'next/navigation'

// Generate static params for all WordPress pages
export async function generateStaticParams() {
  try {
    const pages = await fetchAllPages()
    return pages.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = await fetchPageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title?.rendered || 'Page',
    description: page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
  }
}

export default async function DynamicPage({ params }) {
  try {
    const { slug } = await params
    const page = await fetchPageBySlug(slug)
    
    if (!page) {
      notFound()
    }

    return (
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: page.content?.rendered || 'No content available.' }} />
      </main>
    )
  } catch (error) {
    console.error('Error rendering page:', error)
    notFound()
  }
}