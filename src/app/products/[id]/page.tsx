"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const allProducts = [
  {
    id: 1,
    slug: "maven-wide-leg-cropped-pants",
    name: "Maven Wide Leg Cropped Pants",
    price: "$180.00",
    sku: "KWB10327-10022-XXS",
    rating: 4.8,
    reviews: 38,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1a237e" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    images: ["p-1.jpg", "p-1-1.jpg", "p-1-2.jpg", "p-1-3.jpg"],
    description:
      "A versatile and effortless women's wide-leg cropped trouser that makes you look instantly put together. The high rise and flowing silhouette elongate your frame with elegant movement, while clean lines and subtle shaping keep it classy and refined. Made with our smooth, polished Ponte fabric and added stretch that moves with you, these pull-on pants get you out the door—and into your day—with ease.",
    keyFeatures: [
      "High-rise waist for a flattering fit",
      "Wide-leg cropped silhouette",
      "Pull-on styling for easy wear",
      "Ponte fabric with stretch",
      "Machine washable",
    ],
    fabricCare: [
      "75% Viscose, 20% Nylon, 5% Elastane",
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat",
    ],
    fitSizing: [
      "High-rise: sits at natural waist",
      "Wide-leg cropped silhouette",
      "Pull-on styling",
      "Model is 5'9\" and wearing size S",
    ],
  },
  {
    id: 2,
    slug: "maven-wide-leg-pants-black",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    sku: "KWB10327-10023-XXS",
    rating: 4.9,
    reviews: 42,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1a237e" },
      { name: "Charcoal", value: "#424242" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    images: ["p-2.jpg", "p-2-1.jpg", "p-2-2.jpg", "p-2-3.jpg"],
    description:
      "Classic wide leg pants in versatile black, perfect for both professional and casual settings with premium ponte fabric.",
    keyFeatures: [
      "High-rise waist",
      "Wide-leg full-length silhouette",
      "Premium ponte fabric",
      "4-way stretch comfort",
      "Professional finish",
    ],
    fabricCare: [
      "75% Viscose, 20% Nylon, 5% Elastane",
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat",
    ],
    fitSizing: [
      "High-rise: sits at natural waist",
      "Wide-leg full-length silhouette",
      "Pull-on styling",
      "Model is 5'9\" and wearing size S",
    ],
  },
  {
    id: 3,
    slug: "maven-wide-leg-pants-navy",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    sku: "KWB10327-10024-XXS",
    rating: 4.7,
    reviews: 35,
    colors: [
      { name: "Navy", value: "#1a237e" },
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#424242" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    images: ["p-3.jpg", "p-3-1.jpg", "p-3-2.jpg", "p-3-3.jpg"],
    description:
      "Sophisticated navy wide leg pants that seamlessly transition from office to evening with technical fabric blend.",
    keyFeatures: [
      "Technical fabric blend",
      "Breathable comfort",
      "Flattering high-rise",
      "Wide leg design",
      "Professional finish",
    ],
    fabricCare: [
      "75% Viscose, 20% Nylon, 5% Elastane",
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat",
    ],
    fitSizing: [
      "High-rise: sits at natural waist",
      "Wide-leg full-length silhouette",
      "Pull-on styling",
      "Model is 5'9\" and wearing size S",
    ],
  },
  {
    id: 4,
    slug: "maven-wide-leg-pants-olive",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    sku: "KWB10327-10025-XXS",
    rating: 4.8,
    reviews: 29,
    colors: [
      { name: "Olive", value: "#556b2f" },
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#424242" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    images: ["p-4.jpg", "p-4-1.jpg", "p-4-2.jpg", "p-4-3.jpg"],
    description:
      "Earth-toned olive pants that bring a fresh perspective to your professional wardrobe with sustainable fabric.",
    keyFeatures: [
      "Sustainable fabric",
      "4-way stretch comfort",
      "High-rise cut",
      "Wide leg style",
      "Versatile olive tone",
    ],
    fabricCare: [
      "75% Viscose, 20% Nylon, 5% Elastane",
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat",
    ],
    fitSizing: [
      "High-rise: sits at natural waist",
      "Wide-leg full-length silhouette",
      "Pull-on styling",
      "Model is 5'9\" and wearing size S",
    ],
  },
];

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.id as string;
  const product = allProducts.find((p) => p.slug === productSlug);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [doublIdOption, setDoublIdOption] = useState("input");
  const [doublId, setDoublId] = useState("");

  // Get other products for "Recently Viewed"
  const otherProducts = allProducts.filter((p) => p.slug !== productSlug);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "");
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link href="/maven-pants">
            <Button>Back to Maven Pants</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/maven-pants"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Maven Pants
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Large Images Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-[3/4] bg-gray-100 relative cursor-pointer ${
                    currentImageIndex === index ? "ring-2 ring-gray-900" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={getImagePath(`/${image}`)}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="text-2xl font-medium text-gray-900 mb-2">
                {product.price}
              </div>
              <div className="text-sm text-gray-600 mb-6">
                or 4 payments of $
                {(parseFloat(product.price.replace("$", "")) / 4).toFixed(2)}{" "}
                with <span className="font-semibold">Sezzle</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Color: {selectedColor}
              </h3>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* DOUBL Fit ID Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                How would you like to proceed?
              </h3>

              <Select value={doublIdOption} onValueChange={setDoublIdOption}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Input DOUBL ID</SelectItem>
                  <SelectItem value="no-doubl-id">
                    I don't have a DOUBL ID
                  </SelectItem>
                </SelectContent>
              </Select>

              {doublIdOption === "input" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Enter your DOUBL ID
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., AB12-34CD-5678"
                      value={doublId}
                      onChange={(e) => setDoublId(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Your encrypted fit profile; you'll confirm size at
                      checkout.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      /* Handle apply ID */
                    }}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!doublId}
                  >
                    Apply ID
                  </Button>
                </div>
              )}

              {doublIdOption === "no-doubl-id" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Don't have a DOUBL ID yet? Create one in under 60 seconds.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        /* Handle scan now */
                      }}
                      className="bg-gray-900 hover:bg-gray-800 text-white flex-1 transition-all duration-200 hover:shadow-lg active:scale-95"
                    >
                      SCAN NOW
                    </Button>
                    <Button
                      variant="outline"
                      className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                      What is DOUBL ID?
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 pt-4">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-base font-medium"
                disabled={!selectedSize}
              >
                ADD TO BAG - {product.price} CAD
              </Button>
              <Button size="lg" variant="outline" className="w-full py-4">
                <Heart className="h-5 w-5 mr-2" />
              </Button>
            </div>

            {/* Size Availability */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  Size Availability In-Store
                </span>
                <button className="text-sm text-gray-600 underline hover:text-gray-900">
                  View Store Inventory →
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Reviews */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-gray-900 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-900">
                  {product.reviews} Reviews
                </span>
              </div>
              <div className="text-sm text-gray-600">SKU: {product.sku}</div>
            </div>

            {/* Expandable Sections */}
            <div className="border-t pt-6 space-y-4">
              {/* Key Features */}
              <div className="border-b pb-4">
                <button
                  onClick={() => toggleSection("features")}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                >
                  Key Features
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "features" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedSection === "features" && (
                  <div className="mt-4 space-y-2">
                    {product.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="border-b pb-4">
                <button
                  onClick={() => toggleSection("fabric")}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                >
                  Fabric & Care
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "fabric" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedSection === "fabric" && (
                  <div className="mt-4 space-y-2">
                    {product.fabricCare.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fit & Sizing */}
              <div>
                <button
                  onClick={() => toggleSection("fit")}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                >
                  Fit & Sizing
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "fit" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedSection === "fit" && (
                  <div className="mt-4 space-y-2">
                    {product.fitSizing.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="mt-16 border-t pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Recently Viewed
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherProducts.slice(0, 4).map((item) => (
              <div key={item.id} className="group">
                <Link href={`/products/${item.slug}`}>
                  <div className="aspect-[3/4] bg-gray-100 relative mb-4 cursor-pointer">
                    <Image
                      src={getImagePath(`/${item.images[0]}`)}
                      alt={item.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                    {item.name}
                  </h3>
                  <div className="text-gray-900 font-medium">{item.price}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Review Summary */}
            <div>
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">97%</div>
                <div className="text-gray-600">
                  would recommend these products
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Sizing</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Runs Small</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded relative">
                      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>Runs Large</span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-1">
                    True to Size
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Quality</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Below Expectation</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded relative">
                      <div className="absolute top-1/2 right-4 w-3 h-3 bg-gray-900 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Comfort</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Below Expectation</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded relative">
                      <div className="absolute top-1/2 right-4 w-3 h-3 bg-gray-900 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-gray-900 mr-4">
                    {product.rating}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-gray-900 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-gray-600">
                  Based on {product.reviews} reviews
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { stars: 5, count: 33 },
                  { stars: 4, count: 4 },
                  { stars: 3, count: 1 },
                  { stars: 2, count: 0 },
                  { stars: 1, count: 0 },
                ].map((rating) => (
                  <div
                    key={rating.stars}
                    className="flex items-center space-x-3"
                  >
                    <span className="w-2 text-sm">{rating.stars}</span>
                    <Star className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 bg-gray-200 h-2 rounded">
                      <div
                        className="bg-gray-900 h-2 rounded"
                        style={{
                          width: `${(rating.count / product.reviews) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-gray-600">
                      {rating.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button variant="outline" className="px-6 py-2">
              Reviews ({product.reviews})
            </Button>
            <Button variant="outline" className="px-6 py-2">
              Questions
            </Button>
          </div>

          <div className="fixed bottom-4 right-4">
            <Button className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
              Write a Review
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
