import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  img: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: () => void;
};

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/product/${product._id}`} className="block group">
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}
          <img
            src={product.img}
            alt={product.name}
            className={`w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3">
              <button
                onClick={handleLike}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`}
                />
              </button>
              {onAddToCart && (
                <button
                  onClick={handleAddToCart}
                  className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ₹{product.price}
          </div>

          {/* Rating (mock data for visual appeal) */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.5</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Action button for mobile/fallback */}
          {onAddToCart && (
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg transform hover:scale-105 md:hidden"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          )}
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
}

export default ProductCard;