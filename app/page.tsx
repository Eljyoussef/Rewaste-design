"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, ArrowLeft, ArrowRight, Clock, Truck } from "lucide-react"

interface Skip {
  id: string
  name: string
  size: string
  price: number
  hire_period: number
  image_url?: string
  description?: string
}

const PROGRESS_STEPS = [
  { id: 1, name: "Postcode", completed: true },
  { id: 2, name: "Waste Type", completed: true },
  { id: 3, name: "Select Skip", active: true },
  { id: 4, name: "Permit Check", completed: false },
  { id: 5, name: "Choose Date", completed: false },
  { id: 6, name: "Payment", completed: false },
]

export default function SkipSelection() {
  const [skips, setSkips] = useState<Skip[]>([])
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSkips()
  }, [])

  const fetchSkips = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")

      if (!response.ok) {
        throw new Error("Failed to fetch skip data")
      }

      const data = await response.json()

      // Transform the data to match our interface
      const transformedSkips = data.map((skip: any, index: number) => ({
        id: skip.id || `skip-${index}`,
        name: `${skip.size || (index + 1) * 2} Yard Skip`,
        size: skip.size || `${(index + 1) * 2} Yards`,
        price: skip.price || 200 + index * 50,
        hire_period: skip.hire_period || (index % 2 === 0 ? 7 : 14),
        image_url: skip.image_url,
        description: skip.description,
      }))

      setSkips(transformedSkips)
    } catch (err) {
      console.error("Error fetching skips:", err)
      setError("Unable to load skip options. Please try again.")

      // Fallback data for demo purposes
      setSkips([
        { id: "1", name: "4 Yard Skip", size: "4 Yards", price: 227, hire_period: 7 },
        { id: "2", name: "6 Yard Skip", size: "6 Yards", price: 300, hire_period: 14 },
        { id: "3", name: "8 Yard Skip", size: "8 Yards", price: 325, hire_period: 7 },
        { id: "4", name: "10 Yard Skip", size: "10 Yards", price: 350, hire_period: 7 },
        { id: "5", name: "12 Yard Skip", size: "12 Yards", price: 375, hire_period: 14 },
        { id: "6", name: "14 Yard Skip", size: "14 Yards", price: 400, hire_period: 7 },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId)
  }

  const handleContinue = () => {
    if (selectedSkip) {
      console.log("Continuing with skip:", selectedSkip)
      // Navigate to next step
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {PROGRESS_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : step.active
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block ${
                    step.active ? "text-blue-600" : step.completed ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
                {index < PROGRESS_STEPS.length - 1 && (
                  <div
                    className={`hidden sm:block w-12 h-0.5 ml-4 ${step.completed ? "bg-green-500" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Skip Size</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that best suits your needs.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800">{error}</p>
          </div>
        )}

        {/* Skip Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-8 w-20 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skips.map((skip) => (
              <Card
                key={skip.id}
                className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedSkip === skip.id ? "ring-2 ring-blue-500 shadow-lg transform scale-105" : "hover:shadow-md"
                }`}
                onClick={() => handleSkipSelect(skip.id)}
              >
                <CardContent className="p-0">
                  {/* Skip Image */}
                  <div className="relative h-48 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    {skip.image_url ? (
                      <img
                        src={skip.image_url || "/placeholder.svg"}
                        alt={skip.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Truck className="w-16 h-16 text-yellow-700 mx-auto mb-2" />
                        <Badge variant="secondary" className="bg-white/90 text-yellow-800">
                          {skip.size}
                        </Badge>
                      </div>
                    )}
                    {selectedSkip === skip.id && (
                      <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-2">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Skip Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{skip.name}</h3>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {skip.size}
                      </Badge>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{skip.hire_period} day hire period</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-blue-600">£{skip.price}</span>
                      {/* <span className="text-sm text-gray-500">inc. VAT</span> */}
                    </div>

                    <Button
                      className={`w-full ${
                        selectedSkip === skip.id ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSkipSelect(skip.id)
                      }}
                    >
                      {selectedSkip === skip.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        "Select This Skip"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selected Skip Summary */}
        {selectedSkip && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  Selected: {skips.find((s) => s.id === selectedSkip)?.name}
                </h3>
                <p className="text-blue-700">
                  £{skips.find((s) => s.id === selectedSkip)?.price} for{" "}
                  {skips.find((s) => s.id === selectedSkip)?.hire_period} days
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
