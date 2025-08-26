"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Factory,
  Settings,
  Database,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getImagePath } from "@/lib/utils";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showPortalInfo, setShowPortalInfo] = useState(false);
  const [currentStep, setCurrentStep] = useState(7);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get order data from localStorage
    const savedProduct = localStorage.getItem("checkoutProduct");
    if (savedProduct) {
      setOrderData(JSON.parse(savedProduct));
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoEnded(true);
    setCurrentStep(8);
    // Show portal info after 2 second delay
    setTimeout(() => {
      setShowPortalInfo(true);
    }, 2000);
  };

  const handleSkipDemo = () => {
    setVideoEnded(true);
    setCurrentStep(8);
    setTimeout(() => {
      setShowPortalInfo(true);
    }, 1000);
  };

  const handleToggleView = () => {
    setShowPortalInfo(!showPortalInfo);
    // Reset video ended state when switching back to customer view
    if (showPortalInfo) {
      setVideoEnded(false);
    }
  };

  const handleVideoError = () => {
    console.log("Video failed to load, showing demo placeholder");
    handleSkipDemo();
  };

  const handleGoToPortal = () => {
    router.push("/partner-portal");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      {/* <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Order Processing
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header> */}

      {/* Success Message */}
      <div className="bg-green-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-900">
                Order Confirmed!
              </h2>
              <p className="text-green-700">
                Your personalized item is now being prepared
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 7
                    ? "bg-red-900 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 7 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Pattern Transformation
              </span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 8
                    ? "bg-red-900 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 8 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Production & Portal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showPortalInfo ? (
          /* Step 7: Pattern Transformation */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                DOUBL Pattern Transformation
              </h2>
              <p className="text-xl text-gray-600">
                Watch how DOUBL transforms the pattern into your perfect fit
              </p>
            </div>

            <div className="space-y-12">
              {/* Top Section - Horizontal Layout */}
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* DOUBL Transforms Card */}
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      DOUBL Transforms Your Pattern
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Using your DOUBL ID and the design code, our AI transforms
                      the standard pattern into your perfect fit.
                    </p>
                    {orderData && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Product:</span>
                          <span className="font-medium">{orderData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">DOUBL ID:</span>
                          <span className="font-medium font-mono">
                            {orderData.doublId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          {/* <span className="text-gray-600">Size:</span>
                          <span className="font-medium">
                            {orderData.selectedSize}
                          </span> */}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Process Steps */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#800020" }}
                    >
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        AI Pattern Analysis
                      </h3>
                      <p className="text-gray-600">
                        DOUBL analyzes your measurements and body profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#800020" }}
                    >
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Custom Adjustments
                      </h3>
                      <p className="text-gray-600">
                        Pattern is adjusted for your unique measurements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#800020" }}
                    >
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Production Ready
                      </h3>
                      <p className="text-gray-600">
                        Optimized pattern sent to manufacturing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="space-y-6">
                <Card className="bg-white shadow-xl border max-w-5xl mx-auto">
                  <CardContent className="p-8">
                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        onEnded={handleVideoEnd}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onError={handleVideoError}
                        playsInline
                        muted
                      >
                        <source
                          src={getImagePath(
                            "/DOUBL TAILOR Demo - Made with Clipchamp.mp4"
                          )}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video Overlay Content */}
                      <div className="absolute inset-0 bg-black/20">
                        {/* TAILOR Logo in video */}
                        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div
                            className="text-4xl font-bold mb-2"
                            style={{ color: "#800020" }}
                          >
                            TAILOR
                          </div>
                          <p className="text-white text-sm">
                            Pattern Transformation
                          </p>
                          <div className="mt-4 text-white text-xs">
                            <p>CustomerID: 123ABC</p>
                            <p>DesignCode: 4583417</p>
                          </div>
                        </div> */}

                        {/* Play/Pause Button */}
                        {(!videoEnded || !showPortalInfo) && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <Button
                              onClick={handlePlayPause}
                              size="lg"
                              className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                            >
                              {isPlaying ? (
                                <Pause className="h-6 w-6" />
                              ) : (
                                <Play className="h-6 w-6 ml-1" />
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={videoEnded ? handleToggleView : handleSkipDemo}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    {showPortalInfo
                      ? "View Customer Experience"
                      : "View Partner Portal"}
                  </Button>
                </div>

                {/* {videoEnded && !showPortalInfo && (
                  <Card className="bg-gray-50 border-2 border-dashed border-gray-300 max-w-2xl mx-auto">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-900"></div>
                        <span className="text-gray-700 font-medium">
                          Preparing for production...
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Generating production files and batching order
                      </p>
                    </CardContent>
                  </Card>
                )} */}
              </div>
            </div>
          </div>
        ) : (
          /* Step 8: Production & Portal */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <Button
                variant="outline"
                onClick={handleToggleView}
                className="text-gray-600 border-gray-300 hover:bg-gray-50 mb-6"
              >
                View Customer Experience
              </Button>
            </div>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Factory className="h-12 w-12 text-green-500 mr-3" />
                <h2 className="text-4xl font-bold text-gray-900">
                  Ready for Production!
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Your personalized pattern is now being processed for
                manufacturing
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Production Info */}
              <div className="space-y-6">
                <Card className="bg-white shadow-xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div
                        className="text-3xl font-bold"
                        style={{ color: "#800020" }}
                      >
                        PRODUCTION
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Batch Processing
                          </h4>
                          <p className="text-sm text-gray-600">
                            2D pattern is batched with similar colours and
                            styles and sent directly to the factory for
                            production
                          </p>
                        </div>

                        {/* <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">
                            Sustainability Impact
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-600">
                                Water Saved:
                              </span>
                              <div className="font-bold text-green-900">
                                32L
                              </div>
                            </div>
                            <div>
                              <span className="text-green-600">
                                Returns Avoided:
                              </span>
                              <div className="font-bold text-green-900">
                                85%
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Estimated Production:
                            </span>
                            <span className="font-medium">
                              5-7 business days
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Quality Check:
                            </span>
                            <span className="font-medium">24 hours</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-medium">
                              2-3 business days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portal Access */}
              <div className="space-y-6">
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Database className="h-6 w-6 text-gray-700" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        DOUBL Partner Portal
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">
                      Brand/Retailer can view all their data through our B2B
                      backend portal, including customer data, orders,
                      measurement information, patterns, status, lead time,
                      return rates, and more.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: "#800020" }}
                        >
                          ✓
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Real-time Order Tracking
                          </p>
                          <p className="text-xs text-gray-600">
                            Monitor production status and delivery
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: "#800020" }}
                        >
                          ✓
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Customer Analytics
                          </p>
                          <p className="text-xs text-gray-600">
                            Measurement data and fit insights
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: "#800020" }}
                        >
                          ✓
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Quality Metrics
                          </p>
                          <p className="text-xs text-gray-600">
                            Return rates and sustainability impact
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleGoToPortal}
                      className="w-full py-3 text-lg font-medium text-white transition-all duration-200 hover:shadow-lg active:scale-95"
                      style={{ backgroundColor: "#800020" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5a0015")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#800020")
                      }
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Access Partner Portal
                    </Button>
                  </CardContent>
                </Card>

                {/* <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Order Updates
                    </h4>
                    <p className="text-sm text-blue-800">
                      You'll receive email updates about your order progress.
                      Track your item from pattern generation to delivery.
                    </p>
                  </CardContent>
                </Card> */}

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
