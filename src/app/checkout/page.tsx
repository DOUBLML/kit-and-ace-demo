// COPY: Create new file app/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getImagePath } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const [productData, setProductData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("British Columbia");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Canada");
  const [phone, setPhone] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const [textOffers, setTextOffers] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  useEffect(() => {
    // Get product data from localStorage
    const savedProduct = localStorage.getItem("checkoutProduct");
    if (savedProduct) {
      setProductData(JSON.parse(savedProduct));
    }
  }, []);

  const subtotal = productData?.price
    ? parseFloat(productData.price.replace("$", ""))
    : 180.0;
  const taxes = Math.round(subtotal * 0.12 * 100) / 100;
  const total = subtotal + taxes;

  const handleApplyDiscount = () => {
    console.log("Applying discount:", discountCode);
  };

  const handlePayNow = () => {
    // Save order data for success page including DOUBL ID
    const orderData = {
      ...productData,
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
      total: total,
      email: email,
      doublId: productData?.doublId, // Include DOUBL ID
      customerInfo: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        province,
        postalCode,
        country,
      },
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Navigate to success page
    router.push("/success");
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Loading checkout...
          </h2>
          <p className="text-gray-600">Preparing your order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            KIT + ACE
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            {/* Express Checkout */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Express checkout
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white py-6">
                  Shop Pay
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6">
                  PayPal
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white py-6">
                  G Pay
                </Button>
              </div>
              <div className="text-center text-gray-500 text-sm my-4">OR</div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm underline">
                  Log in
                </button>
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="email-offers"
                  checked={emailOffers}
                  onCheckedChange={(checked) =>
                    setEmailOffers(checked as boolean)
                  }
                />
                <label htmlFor="email-offers" className="text-sm text-gray-600">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Delivery
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <input
                    type="radio"
                    id="ship"
                    name="delivery"
                    value="ship"
                    checked={deliveryMethod === "ship"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="ship" className="font-medium text-gray-900">
                      Ship
                    </label>
                  </div>
                  <div className="text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg">
                  <input
                    type="radio"
                    id="pickup"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="pickup"
                      className="font-medium text-gray-900"
                    >
                      Pick up
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Country/Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <Input
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-4"
              />

              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-4"
              />

              <Input
                placeholder="Apartment, suite, etc. (optional)"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="mt-4"
              />

              <div className="grid grid-cols-3 gap-4 mt-4">
                <Input
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="British Columbia">
                      British Columbia
                    </SelectItem>
                    <SelectItem value="Alberta">Alberta</SelectItem>
                    <SelectItem value="Ontario">Ontario</SelectItem>
                    <SelectItem value="Quebec">Quebec</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-4"
              />

              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="text-offers"
                  checked={textOffers}
                  onCheckedChange={(checked) =>
                    setTextOffers(checked as boolean)
                  }
                />
                <label htmlFor="text-offers" className="text-sm text-gray-600">
                  Text me with news and offers
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping method
              </h2>
              <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600">
                  Enter your shipping address to view available shipping
                  methods.
                </p>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Payment
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-4">
                <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment"
                        value="credit"
                        checked={paymentMethod === "credit"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <label htmlFor="credit-card" className="font-medium">
                        Credit card
                      </label>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                        MC
                      </div>
                      <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                        AMEX
                      </div>
                      <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                        +3
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="mt-4 space-y-4">
                      <Input
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Expiration date (MM / YY)"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                        />
                        <Input
                          placeholder="Security code"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="Name on card"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="paypal" className="font-medium">
                      PayPal
                    </label>
                    <div className="ml-auto">
                      <div className="text-blue-600 font-bold">PayPal</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="afterpay"
                      name="payment"
                      value="afterpay"
                      checked={paymentMethod === "afterpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="afterpay" className="font-medium">
                      Afterpay
                    </label>
                    <div className="ml-auto">
                      <div className="text-teal-600 font-bold">afterpay</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="sezzle"
                      name="payment"
                      value="sezzle"
                      checked={paymentMethod === "sezzle"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="sezzle" className="font-medium">
                      Buy Now, Pay Later with Sezzle
                    </label>
                    <div className="ml-auto flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="billing-address"
                  checked={useShippingAsBilling}
                  onCheckedChange={(checked) =>
                    setUseShippingAsBilling(checked as boolean)
                  }
                />
                <label
                  htmlFor="billing-address"
                  className="text-sm text-gray-600"
                >
                  Use shipping address as billing address
                </label>
              </div>
            </div>

            {/* Remember Me */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Remember me
              </h2>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <label htmlFor="remember-me" className="text-sm text-gray-600">
                  Save my information for a faster checkout with a Shop account
                </label>
              </div>

              <div className="mt-4">
                <Input
                  placeholder="Mobile phone number"
                  className="bg-gray-50"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-600">
                Secure and encrypted
              </span>
              <div className="text-gray-400 text-xl">shop</div>
            </div>

            {/* Pay Now Button */}
            <Button
              onClick={handlePayNow}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-base font-medium"
            >
              Pay now
            </Button>

            <p className="text-xs text-gray-600 text-center">
              Your info will be saved to a Shop account. By continuing, you
              agree to Shop's{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
            <div className="space-y-6">
              {/* Product */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={getImagePath("/p-1.jpg")}
                      alt={productData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {productData.name}
                  </h3>
                </div>
                <div className="font-medium text-gray-900">
                  {productData.price}
                </div>
              </div>

              {/* Discount Code */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Discount code or gift card"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleApplyDiscount}
                  variant="outline"
                  className="px-6"
                >
                  Apply
                </Button>
              </div>

              {/* Summary */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-500">Enter shipping address</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated taxes</span>
                  <span className="font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>
                    <span className="text-sm text-gray-500 font-normal">
                      CAD{" "}
                    </span>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex items-center justify-center space-x-6 mt-12 pt-8 border-t border-gray-200">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Refund policy
          </a>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Shipping
          </a>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Privacy policy
          </a>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Terms of service
          </a>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
