"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Sign Up & Get 20% Off*</h3>
              <p className="text-sm text-gray-600 mb-4">
                Sign up for our newsletter, and we'll say thanks with 20% off
                your first order. Plus, get early access to sales, personalized
                content, new arrival drops, and so much more straight to your
                inbox.
              </p>
            </div>
            <div className="ml-8">
              <div className="flex">
                <Input
                  placeholder="Email address"
                  className="min-w-[200px] mr-2"
                />
                <Button
                  variant="default"
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Our Fabrics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Shipping + Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Shop Locator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Logo */}
        <div className="text-center mb-8">
          <h2 className="text-8xl font-bold text-gray-900 tracking-wider">
            KIT + ACE
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>🇨🇦 Canada ($CAD)</span>
          </div>
          <div className="flex flex-wrap justify-center space-x-4">
            <span>
              © 2025 Kit and Ace Technical Apparel. All Rights Reserved.
            </span>
            <Link href="#" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Terms & Conditions
            </Link>
            <span>
              165 Water St 2nd Fl, Vancouver, BC V6B 1B2, Canada. Designed in
              Canada.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
