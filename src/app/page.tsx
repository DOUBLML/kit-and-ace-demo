"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";
import Link from "next/link";

const mostWantedProducts = [
  {
    id: 1,
    name: "Sophia Short Sleeve Dolman Sweatshirt",
    price: "$79.00",
    originalPrice: "$120.00",
    discount: "34% OFF",
    colors: ["#87CEEB", "#2F4F4F", "#008B8B", "#C0C0C0"],
    image: getImagePath("/kit-ace-product-1.jpg"),
  },
  {
    id: 2,
    name: "Lyon Linen Shorts",
    price: "$99.00",
    originalPrice: "$159.00",
    discount: "38% OFF",
    colors: ["#D2B48C", "#FFD700"],
    image: getImagePath("/kit-ace-product-2.jpg"),
  },
  {
    id: 3,
    name: "Morrison Long Sleeve Linen Shirt",
    price: "$119.00",
    originalPrice: "$199.00",
    discount: "41% OFF",
    colors: ["#FFFFFF", "#F5F5DC"],
    image: getImagePath("/kit-ace-product-3.jpg"),
  },
  {
    id: 4,
    name: "Lyon Linen Dress",
    price: "$119.00",
    originalPrice: "$185.00",
    discount: "34% OFF",
    colors: ["#4682B4", "#FFD700", "#C0C0C0"],
    image: getImagePath("/kit-ace-product-4.jpg"),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Man in cream shirt */}
          <div className="relative bg-gray-50">
            <Image
              src={getImagePath("/kit-ace-hero-male.jpg")}
              alt="Man in cream technical shirt"
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>

          {/* Right side - Woman in light blue shirt with text overlay */}
          <div className="relative bg-blue-50">
            <Image
              src={getImagePath("/kit-ace-hero-female.jpg")}
              alt="Woman in light blue technical shirt"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-12 lg:p-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Fresh Markdowns
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Latest Additions To Our Summer Clearance
              </p>
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium tracking-wide"
              >
                SHOP END OF SUMMER CLEARANCE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Most Wanted Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Most Wanted</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostWantedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: "center 10%" }}
                  />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-900 text-white px-2 py-1 text-xs font-medium">
                    {product.discount}
                  </span>
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center space-x-2 mb-3">
                <span className="font-bold text-gray-900">{product.price}</span>
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            SHOP SUMMER SALE
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
