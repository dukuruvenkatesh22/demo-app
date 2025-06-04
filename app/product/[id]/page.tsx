"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Star, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { useCart } from "@/lib/cart-context"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </Link>
            <h1 className="text-xl font-semibold">BuildMart</h1>
            <Link href="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <img
                src={`/placeholder.svg?height=500&width=500`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{product.rating}</span>
                  <span className="ml-2 text-gray-600">(245 reviews)</span>
                </div>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            <div>
              <span className="text-4xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
              <span className="text-gray-500 ml-2 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
              <span className="text-green-600 ml-2 font-semibold">17% off</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full h-12 text-lg">
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <Button variant="outline" className="w-full h-12 text-lg">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders above ₹500</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Quality Assured</p>
                  <p className="text-xs text-gray-600">Premium materials</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <RotateCcw className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                  <p className="text-xs text-gray-600">7-day return policy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Category</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Material</span>
                  <span>Premium Grade</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Warranty</span>
                  <span>2 Years</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Brand</span>
                  <span>BuildMart Premium</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
