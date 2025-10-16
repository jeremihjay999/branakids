import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

async function getSearchResults(query: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch search results')
  }
  return res.json()
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || ""
  const { products } = await getSearchResults(query)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        <ProductGrid products={products} categories={[]} />
      </div>
      <Footer />
    </div>
  )
}
