import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Star, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const product = await fetchQuery(api.products.getProductById, {
    id: params.id as Id<"products">,
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Image overlay with actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/btn">
                    <Heart className="w-5 h-5 text-gray-600 group-hover/btn:text-red-500 transition-colors" />
                  </button>
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/btn">
                    <Share2 className="w-5 h-5 text-gray-600 group-hover/btn:text-indigo-600 transition-colors" />
                  </button>
                </div>

                {/* Quality badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Premium Quality
                </div>
              </div>
            </div>

            {/* Thumbnail images (placeholder for multiple images) */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-indigo-400 transition-colors">
                  <img
                    src={product.img}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating and reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8 • 127 reviews)</span>
            </div>

            {/* Product name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">Premium Quality Product</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-green-600">
                ₹{product.price}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ₹{Math.floor(product.price * 1.3)}
              </span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                23% OFF
              </span>
            </div>

            {/* Description */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Quality Guarantee</p>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                <RotateCcw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button className="px-4 py-2 hover:bg-gray-100 transition-colors">-</button>
                  <span className="px-4 py-2 border-x border-gray-300 bg-gray-50">1</span>
                  <button className="px-4 py-2 hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold rounded-xl transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Highlights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  Premium materials and construction
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  30-day money-back guarantee
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  Fast and secure shipping
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  24/7 customer support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-square bg-gray-200 group-hover:bg-gray-300 transition-colors">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Related Product {i}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Related Product {i}</h3>
                  <p className="text-green-600 font-bold">₹{product.price - 100}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}