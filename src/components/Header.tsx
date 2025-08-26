"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getImagePath } from "@/lib/utils";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-900 text-white text-center py-2 text-sm">
        End of Summer Sale - Up to 50% Off*. Exclusions Apply. Shop Now
      </div>

      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-black tracking-wide">
                  KIT + ACE
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Women Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="text-gray-900 hover:text-gray-700 flex items-center"
                >
                  Women
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-screen max-w-4xl bg-white border-b border-gray-200 shadow-lg z-50"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-4 gap-8 p-8">
                      {/* Featured Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Featured
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Up to 50% Off
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Summer Sale
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Linen
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              New Arrivals
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Bestsellers Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Bestsellers
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/maven-pants"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Maven Pants
                            </Link>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Marbella Shirts
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Brushed French Terry
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              T-Shirts
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              3 Pack Tees
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Tops Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Tops
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Sweaters + Long Sleeve
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Shirts + Blouses
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              T-Shirts + Tanks
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Jackets + Blazers
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Bottoms Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Bottoms
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Pants + Leggings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Shorts + Skirts
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900"
                            >
                              Dresses + Jumpsuits
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <Link href="#" className="text-gray-900 hover:text-gray-700">
                  Men
                </Link>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-900" />
              </div>

              <div className="flex items-center">
                <Link href="#" className="text-gray-900 hover:text-gray-700">
                  Sale
                </Link>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-900" />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-700 cursor-pointer" />
              <User className="h-5 w-5 text-gray-700 cursor-pointer" />
              <div className="relative">
                <ShoppingBag className="h-5 w-5 text-gray-700 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
