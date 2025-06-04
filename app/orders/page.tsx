"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  items: any[]
  total: number
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  status: "confirmed" | "processing" | "shipped" | "delivered"
  date: string
  estimatedDelivery: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Clock className="h-5 w-5" />
      case "processing":
        return <Package className="h-5 w-5" />
      case "shipped":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Products</span>
              </Link>
              <h1 className="text-xl font-semibold">Order Tracking</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet</p>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </Link>
            <h1 className="text-xl font-semibold">Order Tracking</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                  <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-2">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`/placeholder.svg?height=50&width=50`}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.address}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">₹{order.total.toLocaleString()}</span>
                  </div>

                  {/* Order Progress */}
                  <div className="pt-4">
                    <h4 className="font-semibold mb-3">Order Progress</h4>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex flex-col items-center ${order.status === "confirmed" || order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "text-blue-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "confirmed" || order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Confirmed</span>
                      </div>
                      <div
                        className={`flex-1 h-1 mx-2 ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "bg-blue-600" : "bg-gray-200"}`}
                      ></div>
                      <div
                        className={`flex flex-col items-center ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "text-blue-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                          <Package className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Processing</span>
                      </div>
                      <div
                        className={`flex-1 h-1 mx-2 ${order.status === "shipped" || order.status === "delivered" ? "bg-blue-600" : "bg-gray-200"}`}
                      ></div>
                      <div
                        className={`flex flex-col items-center ${order.status === "shipped" || order.status === "delivered" ? "text-blue-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "shipped" || order.status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                          <Truck className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Shipped</span>
                      </div>
                      <div
                        className={`flex-1 h-1 mx-2 ${order.status === "delivered" ? "bg-blue-600" : "bg-gray-200"}`}
                      ></div>
                      <div
                        className={`flex flex-col items-center ${order.status === "delivered" ? "text-blue-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
