"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";
import Badge from "@/components/Badge";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">About Adam</h1>
          </div>
          
          <div className="space-y-16">
            <ScrollAnimation animation="scale-in" delay={1400}>
              <section className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-12 glow-border card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-semibold mb-6 glow-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Ready to Start Learning?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Explore our free mathematics resources and begin your journey to mathematical confidence.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/mathematics" className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
                      View Mathematics Units
                    </Link>
                    <Link href="/" className="btn-glow bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </section>
            </ScrollAnimation>
          </div>
        </div>
      </main>
    </div>
  );
}
