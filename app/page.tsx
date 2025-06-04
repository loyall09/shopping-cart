'use client';

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { Search, ShoppingBag, Sparkles } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const products = useQuery(api.products.getProducts);
  const addToCart = useMutation(api.cart.addToCart);

  const handleAddToCart = async (productId: string, name: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await addToCart({
      userId,
      productId: productId as Id<"products">,
      quantity: 1,
    });

    // Create a more elegant notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        ${name} added to cart!
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  if (!products) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Find everything you need in our curated collection of premium products
            </p>
            
            {/* Enhanced Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center bg-white rounded-full shadow-xl overflow-hidden">
                  <div className="pl-6">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products..."
                    className="flex-1 border-0 bg-transparent py-4 px-4 text-lg focus:ring-0 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product._id, product.name)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your products delivered quickly and safely</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest products make it to our store</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find exactly what you're looking for instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}