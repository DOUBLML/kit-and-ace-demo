"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";
import Link from "next/link";

const products = [
  {
    id: 1,
    slug: "maven-wide-leg-cropped-pants",
    name: "Maven Wide Leg Cropped Pants",
    price: "$180.00",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1a237e" },
    ],
    image: getImagePath("/p-1.jpg"),
  },
  {
    id: 2,
    slug: "maven-wide-leg-pants-black",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1a237e" },
      { name: "Charcoal", value: "#424242" },
    ],
    image: getImagePath("/p-2.jpg"),
  },
  {
    id: 3,
    slug: "maven-wide-leg-pants-navy",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    colors: [
      { name: "Navy", value: "#1a237e" },
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#424242" },
    ],
    image: getImagePath("/p-3.jpg"),
  },
  {
    id: 4,
    slug: "maven-wide-leg-pants-olive",
    name: "Maven Wide Leg Pants",
    price: "$190.00",
    colors: [
      { name: "Olive", value: "#556b2f" },
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#424242" },
    ],
    image: getImagePath("/p-4.jpg"),
  },
];

const filterOptions = [
  { name: "Gender", options: ["Women", "Men"] },
  { name: "Category", options: ["Pants", "Wide Leg", "Cropped"] },
  { name: "Color", options: ["Black", "Navy", "Charcoal", "Olive"] },
  { name: "Size", options: ["XS", "S", "M", "L", "XL"] },
  { name: "Price", options: ["Under $150", "$150-200", "Over $200"] },
  { name: "Fit", options: ["Wide Leg", "Straight", "Slim"] },
  {
    name: "Features",
    options: ["Wrinkle Resistant", "Stretch", "Moisture Wicking"],
  },
  { name: "Fabric", options: ["Technical Cotton", "Ponte", "Technical Wool"] },
  { name: "Season", options: ["Spring", "Summer", "Fall", "Winter"] },
];

export default function MavenPantsPage() {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Featured");

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            ← All Collections
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Maven Pants
              </h1>
              {/* <span className="text-lg text-gray-600">5</span> */}
            </div>
            <div className="max-w-2xl">
              <p className="text-gray-700 leading-relaxed">
                The Women's Maven Pant blends timeless style with modern
                comfort. Featuring a tailored fit, 4-way stretch, and
                wrinkle-resistant fabric, it's your go-to for effortless,
                all-day elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="space-y-6">
              <h3 className="font-medium text-gray-900 mb-4">Filter:</h3>

              {filterOptions.map((filter) => (
                <div
                  key={filter.name}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                    onClick={() => toggleFilter(filter.name)}
                  >
                    {filter.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedFilters.includes(filter.name)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  {expandedFilters.includes(filter.name) && (
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Price: Low to High">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="Price: High to Low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-sm text-gray-600">5 products</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative mb-4 cursor-pointer">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          style={{ objectPosition: "center 20%" }}
                        />
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-bold text-gray-900">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed mt-5">
              <p>
                Elevate your everyday look with the{" "}
                <strong>Women's Maven Pant</strong>—a perfect fusion of modern
                sophistication, comfort, and functionality. Designed for the
                woman on the go, these <strong>tailored women's pants</strong>{" "}
                offer a refined silhouette that effortlessly transitions from
                professional settings to casual weekends.
              </p>

              <p>
                Crafted with intention, the <strong>Maven Pant</strong> features
                a flattering <strong>high-rise waist</strong> and{" "}
                <strong>straight-leg cut</strong>, delivering a clean,
                structured fit that suits all body types. Whether you're heading
                to the office, traveling, or going out for dinner, these{" "}
                <strong>versatile women's pants</strong> are your go-to for
                effortless style and ease.
              </p>

              <p>
                Made from <strong>premium, wrinkle-resistant fabric</strong>{" "}
                with <strong>4-way stretch</strong>, the Maven Pant ensures
                breathable comfort and unrestricted movement. The{" "}
                <strong>moisture-wicking technology</strong> keeps you cool and
                polished throughout the day—no matter the pace or place.
              </p>

              <p>
                Available in a range of{" "}
                <strong>neutral, wear-anywhere tones</strong>, the Maven Pant
                pairs perfectly with blouses, knits, tees, and tailored blazers.
                Whether you're creating a{" "}
                <strong>business casual outfit</strong>, dressing for travel, or
                updating your daily wardrobe, this is a must-have piece that
                complements your minimalist aesthetic and busy lifestyle.
              </p>

              <p>
                Redefine what it means to dress well every day with the{" "}
                <strong>Maven Pant by Kit and Ace</strong>—where elevated design
                meets functional fashion for modern women.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
