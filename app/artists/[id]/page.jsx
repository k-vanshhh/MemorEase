"use client"

import { useState, useEffect } from "react"
import { artistAPI } from "../../../lib/api.js"
import { Card } from "../../../components/ui/card.jsx"
import { Button } from "../../../components/ui/button.jsx"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function ArtistProfilePage() {
  const params = useParams()
  const artistId = params.id
  const [artist, setArtist] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistData = await artistAPI.getById(artistId)
        setArtist(artistData)

        const productsData = await artistAPI.getProducts(artistId)
        setProducts(productsData || [])
      } catch (err) {
        console.error("Error fetching artist:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [artistId])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!artist) return <div className="min-h-screen flex items-center justify-center">Artist not found</div>

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Artist Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <Image
                src={artist.profileImage || "/placeholder.svg"}
                alt={artist.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{artist.specialty}</p>
              <p className="text-gray-700 mb-6">{artist.bio}</p>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="text-2xl font-bold">{artist.rating || 5}</span>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div>
                  <span className="text-2xl font-bold">{artist.followers || 1200}</span>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div>
                  <span className="text-2xl font-bold">{products.length}</span>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
              </div>
              <Button size="lg">Follow Artist</Button>
            </div>
          </div>
        </div>

        {/* Artist Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition">
                <div className="relative h-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}