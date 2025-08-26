"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, CheckCircle, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";

export default function GenerateDoublIdPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showGeneratedId, setShowGeneratedId] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [currentStep, setCurrentStep] = useState(4);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Generate a random DOUBL ID
    const generateId = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const segments = [];
      for (let i = 0; i < 2; i++) {
        let segment = "";
        for (let j = 0; j < 4; j++) {
          segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        segments.push(segment);
      }
      // Add final segment
      let finalSegment = "";
      for (let j = 0; j < 3; j++) {
        finalSegment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(finalSegment);
      return segments.join("-");
    };

    setGeneratedId(generateId());
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
    setCurrentStep(5);
    // Show generated ID after 2 second delay for better UX
    setTimeout(() => {
      setShowGeneratedId(true);
    }, 2000);
  };

  const handleBackToProduct = () => {
    // Save the generated DOUBL ID to localStorage
    localStorage.setItem("generatedDoublId", generatedId);
    router.back();
  };

  const handleSkipDemo = () => {
    setVideoEnded(true);
    setCurrentStep(5);
    setTimeout(() => {
      setShowGeneratedId(true);
    }, 1000);
  };

  const handleVideoError = () => {
    console.log("Video failed to load, showing demo placeholder");
    // If video fails, just skip to generated ID
    handleSkipDemo();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Progress Steps */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 4
                    ? "bg-red-900 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 4 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Scan Demo
              </span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 5
                    ? "bg-red-900 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 5 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Generate DOUBL ID
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showGeneratedId ? (
          /* Step 4: Scan Demo */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Watch Your Scan Demo
              </h2>
              <p className="text-xl text-gray-600">
                See how easy it is to get your perfect fit in under 60 seconds
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Video Section */}
              <div className="space-y-6">
                <Card className="bg-white shadow-xl border">
                  <CardContent className="p-6">
                    <div className="relative bg-black rounded-lg overflow-hidden aspect-[9/16] max-w-sm mx-auto">
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
                          src={getImagePath("/DOUBL-scan-demo.mp4")}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video Overlay Content */}
                      <div className="absolute inset-0 bg-black/20">
                        {/* Play/Pause Button */}
                        {!videoEnded && (
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
                    onClick={handleSkipDemo}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Skip Demo & Generate ID
                  </Button>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-8">
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
                        Get Ready
                      </h3>
                      <p className="text-gray-600">Prepare your space</p>
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
                        Choose Your Backdrop
                      </h3>
                      <p className="text-gray-600">
                        Find a plain background for best results
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
                        Position Your Phone
                      </h3>
                      <p className="text-gray-600">
                        Place 2 meters from wall at knee-to-hip height
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#800020" }}
                    >
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Download the App
                      </h3>
                      <p className="text-gray-600">
                        Get the DOUBL app to start your scan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#800020" }}
                    >
                      <span className="text-white font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Get Your DOUBL ID
                      </h3>
                      <p className="text-gray-600">
                        Receive your personalized fit profile instantly
                      </p>
                    </div>
                  </div>
                </div>

                {videoEnded && !showGeneratedId && (
                  <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-900"></div>
                        <span className="text-gray-700 font-medium">
                          Processing your scan...
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Creating your personalized fit profile
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Step 5: Generated ID */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
                <h2 className="text-4xl font-bold text-gray-900">
                  Your DOUBL ID is Ready!
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Your personalized fit profile has been created successfully
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Generated ID Card */}
              <div className="space-y-6">
                <Card className="bg-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div
                        className="text-4xl font-bold"
                        style={{ color: "#800020" }}
                      >
                        DOUBL
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                          DOUBL ID
                        </div>
                        <div className="text-3xl font-bold text-gray-900 font-mono tracking-wider">
                          {generatedId}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="space-y-2">
                          <div className="text-xl font-semibold text-gray-900">
                            Jane Doe
                          </div>
                          <div className="text-gray-600">
                            jane.doe@email.com
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500 mb-4">
                          COMPATIBLE STORES
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-lg font-semibold text-gray-900">
                              Level Six
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              Avaliable
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-lg font-semibold text-gray-900">
                              Knix
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              Avaliable
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  lu
                                </span>
                              </div>
                              <span className="font-semibold text-gray-900">
                                lululemon
                              </span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              Avaliable
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-900">
                              alo
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              Avaliable
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-900">
                              ARITZIA
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              Avaliable
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Section */}
              <div className="space-y-6">
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      What's Next?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: "#800020" }}
                        >
                          1
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Use your DOUBL ID
                          </p>
                          <p className="text-xs text-gray-600">
                            Go back and complete your purchase
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
                          2
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Save for future purchases
                          </p>
                          <p className="text-xs text-gray-600">
                            Use across all partner stores
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Button
                    onClick={handleBackToProduct}
                    className="w-full py-3 text-lg font-medium text-white transition-all duration-200 hover:shadow-lg active:scale-95"
                    style={{ backgroundColor: "#800020" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#5a0015")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#800020")
                    }
                  >
                    Complete Your Purchase
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowGeneratedId(false);
                      setVideoEnded(false);
                      setCurrentStep(4);
                      setGeneratedId(() => {
                        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        const segments = [];
                        for (let i = 0; i < 2; i++) {
                          let segment = "";
                          for (let j = 0; j < 4; j++) {
                            segment += chars.charAt(
                              Math.floor(Math.random() * chars.length)
                            );
                          }
                          segments.push(segment);
                        }
                        let finalSegment = "";
                        for (let j = 0; j < 3; j++) {
                          finalSegment += chars.charAt(
                            Math.floor(Math.random() * chars.length)
                          );
                        }
                        segments.push(finalSegment);
                        return segments.join("-");
                      });
                    }}
                    className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Generate New ID
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => router.back()}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Back to Product
                    </Button>
                  </div>
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
