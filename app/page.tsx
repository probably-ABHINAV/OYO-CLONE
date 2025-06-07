"use client"

import React from "react"
import { useState } from "react"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Wind,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
  Grid3X3,
  List,
  Sparkles,
  Award,
  Clock,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"
import { Moon, Sun, DoorClosedIcon as CloseIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample hotel data with enhanced properties
const hotels = [
  {
    id: 1,
    name: "The Grand Meridian",
    location: "Bandra West, Mumbai",
    rating: 4.8,
    reviewCount: 2847,
    price: 8500,
    originalPrice: 12000,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Executive Suite",
    amenities: ["wifi", "ac", "pool", "gym", "parking", "restaurant"],
    discount: 29,
    soldOut: false,
    featured: true,
    verified: true,
    instantBook: true,
    tags: ["Business", "Luxury", "City Center"],
  },
  {
    id: 2,
    name: "Azure Beach Resort",
    location: "Candolim, North Goa",
    rating: 4.9,
    reviewCount: 1923,
    price: 12200,
    originalPrice: 15000,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Ocean View Villa",
    amenities: ["wifi", "ac", "pool", "restaurant", "parking"],
    discount: 19,
    soldOut: false,
    featured: true,
    verified: true,
    instantBook: true,
    tags: ["Beach", "Luxury", "Romantic"],
  },
  {
    id: 3,
    name: "Urban Loft Hotel",
    location: "Connaught Place, Delhi",
    rating: 4.6,
    reviewCount: 3421,
    price: 6800,
    originalPrice: 8500,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Premium Double",
    amenities: ["wifi", "ac", "gym", "restaurant"],
    discount: 20,
    soldOut: false,
    featured: false,
    verified: true,
    instantBook: false,
    tags: ["Business", "Modern", "Metro"],
  },
  {
    id: 4,
    name: "Royal Heritage Palace",
    location: "Pink City, Jaipur",
    rating: 4.7,
    reviewCount: 1654,
    price: 9100,
    originalPrice: 11500,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Maharaja Suite",
    amenities: ["wifi", "ac", "pool", "restaurant", "parking"],
    discount: 21,
    soldOut: true,
    featured: false,
    verified: true,
    instantBook: false,
    tags: ["Heritage", "Luxury", "Cultural"],
  },
  {
    id: 5,
    name: "Mountain Vista Resort",
    location: "Mall Road, Shimla",
    rating: 4.5,
    reviewCount: 987,
    price: 5200,
    originalPrice: 6800,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Valley View Room",
    amenities: ["wifi", "ac", "gym"],
    discount: 24,
    soldOut: false,
    featured: false,
    verified: true,
    instantBook: true,
    tags: ["Mountain", "Nature", "Peaceful"],
  },
  {
    id: 6,
    name: "Tech Hub Suites",
    location: "Electronic City, Bangalore",
    rating: 4.8,
    reviewCount: 2156,
    price: 7500,
    originalPrice: 9200,
    image: "/placeholder.svg?height=300&width=400",
    roomType: "Business Suite",
    amenities: ["wifi", "ac", "pool", "gym", "restaurant", "parking"],
    discount: 18,
    soldOut: false,
    featured: true,
    verified: true,
    instantBook: true,
    tags: ["Business", "Tech", "Modern"],
  },
]

const amenityIcons = {
  wifi: Wifi,
  ac: Wind,
  pool: Waves,
  gym: Dumbbell,
  restaurant: Utensils,
  parking: Car,
}

export default function HotelBookingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 15000])
  const [selectedRating, setSelectedRating] = useState<number[]>([])
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [guests, setGuests] = useState({ adults: 2, children: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const roomTypes = ["Single", "Double", "Deluxe", "Suite", "Villa"]
  const amenities = [
    { id: "wifi", label: "Free WiFi" },
    { id: "pool", label: "Swimming Pool" },
    { id: "ac", label: "Air Conditioning" },
    { id: "gym", label: "Fitness Center" },
    { id: "parking", label: "Free Parking" },
    { id: "restaurant", label: "Restaurant" },
    { id: "spa", label: "Spa & Wellness" },
    { id: "pet", label: "Pet Friendly" },
  ]

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(roomType) ? prev.filter((rt) => rt !== roomType) : [...prev, roomType],
    )
  }

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  const handleBookNow = (hotelName: string) => {
    toast({
      title: "🎉 Booking Confirmed!",
      description: `Your reservation at ${hotelName} has been secured. Confirmation details sent to your email.`,
      duration: 5000,
    })
  }

  const clearFilter = (type: string, value?: string | number) => {
    switch (type) {
      case "rating":
        if (value !== undefined) {
          setSelectedRating((prev) => prev.filter((r) => r !== value))
        }
        break
      case "roomType":
        if (value) {
          setSelectedRoomTypes((prev) => prev.filter((rt) => rt !== value))
        }
        break
      case "amenity":
        if (value) {
          setSelectedAmenities((prev) => prev.filter((a) => a !== value))
        }
        break
      case "price":
        setPriceRange([1000, 15000])
        break
    }
  }

  const getActiveFiltersCount = () => {
    return (
      selectedRating.length +
      selectedRoomTypes.length +
      selectedAmenities.length +
      (priceRange[0] !== 1000 || priceRange[1] !== 15000 ? 1 : 0)
    )
  }

  const DarkModeToggle = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  const SkeletonCard = () => (
    <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
      <Skeleton className="h-64 w-full" />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-lg" />
          ))}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <Skeleton className="h-8 w-24 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StayEasy
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Hotels
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Experiences
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Support
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <DarkModeToggle />
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300 font-medium">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg">
                Join Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Discover
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Hotels
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Experiences
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Support
                </a>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Dark Mode</span>
                  <DarkModeToggle />
                </div>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button variant="ghost" className="justify-start font-medium">
                    Sign In
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white justify-start font-medium">
                    Join Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">Discover Amazing Places</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Perfect Stay
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Discover handpicked hotels, resorts, and unique stays around the world with unbeatable prices and instant
              booking.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <Card className="max-w-5xl mx-auto shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <Tabs defaultValue="hotels" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="hotels" className="font-medium">
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger value="flights" className="font-medium">
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="font-medium">
                    Packages
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hotels">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Location */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Where to?
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="City, hotel, or landmark"
                          className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl font-medium"
                        />
                      </div>
                    </div>

                    {/* Check-in Date */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Check-in
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          type="date"
                          className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl font-medium"
                        />
                      </div>
                    </div>

                    {/* Check-out Date */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Check-out
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          type="date"
                          className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl font-medium"
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder={`${guests.adults} Adults, ${guests.children} Children`}
                          className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl font-medium"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Search className="w-5 h-5 mr-3" />
                      Search Hotels
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Controls */}
          <div className="lg:hidden space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setMobileFiltersOpen(true)}
                variant="outline"
                className="flex-1 h-12 border-2 font-medium"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Button>
              <Button variant="outline" className="h-12 px-4 border-2">
                <ArrowUpDown className="w-4 h-4" />
              </Button>
              <div className="flex border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none h-12 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none h-12 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filter Chips - Mobile */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap gap-2">
                {priceRange[0] !== 1000 || priceRange[1] !== 15000 ? (
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                    <CloseIcon
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => clearFilter("price")}
                    />
                  </Badge>
                ) : null}
                {selectedRating.map((rating) => (
                  <Badge key={rating} variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    {rating}★
                    <CloseIcon
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => clearFilter("rating", rating)}
                    />
                  </Badge>
                ))}
                {selectedRoomTypes.map((roomType) => (
                  <Badge key={roomType} variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    {roomType}
                    <CloseIcon
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => clearFilter("roomType", roomType)}
                    />
                  </Badge>
                ))}
                {selectedAmenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    {amenities.find((a) => a.id === amenity)?.label}
                    <CloseIcon
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => clearFilter("amenity", amenity)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Filter Sidebar */}
          <aside
            className={`
              lg:w-80 lg:block lg:relative
              ${
                mobileFiltersOpen ? "fixed inset-0 z-50 bg-white dark:bg-gray-950 lg:bg-transparent" : "hidden lg:block"
              }
            `}
          >
            {/* Mobile Filter Overlay */}
            {mobileFiltersOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileFiltersOpen(false)}
              />
            )}

            {/* Filter Content */}
            <div
              className={`
              lg:relative lg:z-auto
              ${
                mobileFiltersOpen
                  ? "fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-950 z-50 overflow-y-auto shadow-2xl"
                  : ""
              }
            `}
            >
              {/* Mobile Filter Header */}
              <div className="lg:hidden flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                  <CloseIcon className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 lg:p-0">
                {/* Active Filter Chips - Desktop */}
                <div className="hidden lg:block mb-6">
                  {getActiveFiltersCount() > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Active Filters</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {priceRange[0] !== 1000 || priceRange[1] !== 15000 ? (
                          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-full">
                            ₹{priceRange[0]} - ₹{priceRange[1]}
                            <CloseIcon
                              className="w-3 h-3 cursor-pointer hover:text-red-500"
                              onClick={() => clearFilter("price")}
                            />
                          </Badge>
                        ) : null}
                        {selectedRating.map((rating) => (
                          <Badge
                            key={rating}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 rounded-full"
                          >
                            {rating}★
                            <CloseIcon
                              className="w-3 h-3 cursor-pointer hover:text-red-500"
                              onClick={() => clearFilter("rating", rating)}
                            />
                          </Badge>
                        ))}
                        {selectedRoomTypes.map((roomType) => (
                          <Badge
                            key={roomType}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 rounded-full"
                          >
                            {roomType}
                            <CloseIcon
                              className="w-3 h-3 cursor-pointer hover:text-red-500"
                              onClick={() => clearFilter("roomType", roomType)}
                            />
                          </Badge>
                        ))}
                        {selectedAmenities.map((amenity) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 rounded-full"
                          >
                            {amenities.find((a) => a.id === amenity)?.label}
                            <CloseIcon
                              className="w-3 h-3 cursor-pointer hover:text-red-500"
                              onClick={() => clearFilter("amenity", amenity)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                  <CardContent className="p-6 space-y-8">
                    {/* Price Range */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Price Range (per night)</h3>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={20000}
                          min={500}
                          step={100}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                          <span>₹{priceRange[0].toLocaleString()}</span>
                          <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Star Rating</h3>
                      <div className="space-y-4">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3">
                            <Checkbox
                              id={`rating-${rating}`}
                              checked={selectedRating.includes(rating)}
                              onCheckedChange={() => handleRatingChange(rating)}
                              className="rounded-md"
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="flex items-center space-x-2 cursor-pointer flex-1"
                            >
                              <div className="flex items-center">{renderStars(rating)}</div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {rating} Star{rating !== 1 ? "s" : ""}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Room Type */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Room Type</h3>
                      <div className="space-y-4">
                        {roomTypes.map((roomType) => (
                          <div key={roomType} className="flex items-center space-x-3">
                            <Checkbox
                              id={`room-${roomType}`}
                              checked={selectedRoomTypes.includes(roomType)}
                              onCheckedChange={() => handleRoomTypeChange(roomType)}
                              className="rounded-md"
                            />
                            <label
                              htmlFor={`room-${roomType}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                            >
                              {roomType}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Amenities</h3>
                      <div className="space-y-4">
                        {amenities.map((amenity) => (
                          <div key={amenity.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={`amenity-${amenity.id}`}
                              checked={selectedAmenities.includes(amenity.id)}
                              onCheckedChange={() => handleAmenityChange(amenity.id)}
                              className="rounded-md"
                            />
                            <label
                              htmlFor={`amenity-${amenity.id}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                            >
                              {amenity.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full h-12 font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => {
                        setPriceRange([1000, 15000])
                        setSelectedRating([])
                        setSelectedRoomTypes([])
                        setSelectedAmenities([])
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </aside>

          {/* Enhanced Hotel Listings */}
          <main className="flex-1">
            {/* Header with Controls */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Amazing Hotels</h2>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {hotels.length} handpicked properties • Updated 2 minutes ago
                </p>
              </div>

              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
                  <select
                    className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-medium focus:border-blue-500 dark:focus:border-blue-400"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
                <div className="flex border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none h-10 px-3"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none h-10 px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hotel Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : (
              <div className={`grid gap-8 mb-12 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {hotels.map((hotel) => (
                  <Card
                    key={hotel.id}
                    className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative bg-white dark:bg-gray-900 group"
                  >
                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {hotel.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-3 py-1">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {hotel.discount && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-3 py-1">
                          {hotel.discount}% OFF
                        </Badge>
                      )}
                      {hotel.instantBook && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-3 py-1">
                          <Clock className="w-3 h-3 mr-1" />
                          Instant
                        </Badge>
                      )}
                    </div>

                    {/* Sold Out Overlay */}
                    {hotel.soldOut && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center backdrop-blur-sm">
                        <Badge variant="destructive" className="text-lg px-6 py-3 font-bold">
                          Sold Out
                        </Badge>
                      </div>
                    )}

                    {/* Enhanced Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 w-10 h-10 rounded-full shadow-lg"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>

                    {/* Enhanced Hotel Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6">
                      {/* Hotel Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                              {hotel.name}
                            </h3>
                            {hotel.verified && <Shield className="w-4 h-4 text-blue-500" />}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.location}
                          </p>

                          {/* Enhanced Rating */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">{renderStars(hotel.rating)}</div>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">{hotel.rating}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                              ({hotel.reviewCount.toLocaleString()} reviews)
                            </span>
                            {hotel.rating >= 4.7 && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              >
                                <Award className="w-3 h-3 mr-1" />
                                Excellent
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="rounded-full font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Room Type */}
                      <div className="mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold px-3 py-1"
                        >
                          {hotel.roomType}
                        </Badge>
                      </div>

                      {/* Enhanced Amenities */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {hotel.amenities.slice(0, 5).map((amenity) => {
                          const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                          return IconComponent ? (
                            <div
                              key={amenity}
                              className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              title={amenity}
                            >
                              <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                          ) : null
                        })}
                        {hotel.amenities.length > 5 && (
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400">
                            +{hotel.amenities.length - 5}
                          </div>
                        )}
                      </div>

                      {/* Enhanced Price and Actions */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                              ₹{hotel.price.toLocaleString()}
                            </span>
                            {hotel.originalPrice && (
                              <span className="text-lg text-gray-500 line-through font-medium">
                                ₹{hotel.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            per night • includes taxes
                          </p>
                        </div>

                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            View Details
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            size="sm"
                            disabled={hotel.soldOut}
                            onClick={() => handleBookNow(hotel.name)}
                          >
                            {hotel.instantBook ? "Book Instantly" : "Book Now"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="font-medium border-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`font-medium border-2 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-transparent"
                      : ""
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 5}
                onClick={() => setCurrentPage((prev) => Math.min(5, prev + 1))}
                className="font-medium border-2"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StayEasy
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Discover extraordinary places to stay around the world. From luxury resorts to cozy boutique hotels,
                we've got your perfect getaway covered.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Discover</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Top Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Luxury Hotels
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Budget Stays
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Business Travel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Weekend Getaways
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Travel Insurance
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Press & Media
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Partner with Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-medium">
                    Investor Relations
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm font-medium">
              © 2024 StayEasy. All rights reserved. Made with ❤️ for travelers worldwide.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
