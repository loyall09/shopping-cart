'use client';

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('name');

  const products = useQuery(api.products.getProducts);

  if (!products) return <Loading />;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return 0; // Since we don't have a date field, keeping original order
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-gray-600 mt-1">
                for "<span className="font-semibold text-indigo-600">{query}</span>"
              </p>
            </div>
          </div>

          {/* Results count and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                {filteredProducts.length} products found
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'newest')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{query}".
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Try adjusting your search:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check your spelling</li>
                <li>Use different keywords</li>
                <li>Try more general terms</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product._id}
                className={`transform transition-all duration-300 hover:scale-105 ${
                  viewMode === 'list' ? 'max-w-none' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Back to top button */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </div>
        )}
      </div>
    </div>
  );
}