import { notFound } from 'next/navigation'
import ShopDetailPage from '@/sections/pages/shop-detail-page'
import { products, getProductById, getRelatedProducts } from '@/data/products'

// The catalog is a static file, so every product page is prebuilt and any
// unknown id 404s instead of rendering on demand.
export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: 'Product not found | Northwest Oregon PAC' }
  return {
    title: `${product.name} | Shop | Northwest Oregon PAC`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
    },
  }
}

export default async function Page({ params }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  return <ShopDetailPage product={product} related={getRelatedProducts(id, 3)} />
}
