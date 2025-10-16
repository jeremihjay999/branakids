import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.trim() || ""

    if (!query) {
      return NextResponse.json({ products: [] })
    }

    const client = await clientPromise
    const db = client.db("branakids")
    const collection = db.collection("products")

    const searchPipeline = [
      {
        $search: {
          index: "default",
          text: {
            query: query,
            path: { 
              wildcard: "*" 
            },
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2
            }
          }
        }
      },
      {
        $limit: 20
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          images: 1,
          category: 1,
          stock: 1,
          isDeal: 1,
          dealPrice: 1,
          previousPrice: 1,
          tags: 1,
          score: { $meta: "searchScore" }
        }
      }
    ]

    const products = await collection.aggregate(searchPipeline).toArray()

    return NextResponse.json({ products })

  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    )
  }
}
