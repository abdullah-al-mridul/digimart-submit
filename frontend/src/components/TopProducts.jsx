import React, { useEffect } from "react";
import { Star, ShoppingCart, MoveRight } from "lucide-react";
import store from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import cartStore from "../store/cartStore";

const TopProductsSkeleton = () => {
  return (
    <div className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto border-2 border-dashed border-level-4 border-t-0 border-b-0 p-4">
        {/* Header Section Skeleton */}
        <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 mb-4"></div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border-2 border-level-4 rounded-xl overflow-hidden"
            >
              {/* Product Image Skeleton */}
              <div className="relative h-52 overflow-hidden flex items-center justify-center p-4 bg-level-2/60">
                <div className="w-11/12 h-11/12 rounded-xl bg-level-3/50 animate-pulse"></div>
                {/* Discount Badge Skeleton */}
                <div className="absolute top-5 left-5 h-6 w-16 bg-level-3/50 animate-pulse rounded-lg transform -rotate-12"></div>
              </div>

              {/* Product Info Skeleton */}
              <div className="p-5 space-y-4">
                {/* Category & Brand Skeleton */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-sm"></div>
                  <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-sm"></div>
                </div>

                {/* Product Name Skeleton */}
                <div className="h-7 w-3/4 bg-level-3/50 animate-pulse rounded-lg"></div>

                {/* Rating Skeleton */}
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-4 h-4 bg-level-3/50 animate-pulse rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-4 w-12 bg-level-3/50 animate-pulse rounded ml-2"></div>
                </div>

                {/* Price & Stock Skeleton */}
                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <div className="h-8 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-5 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-full"></div>
                </div>

                {/* Add to Cart Button Skeleton */}
                <div className="h-12 w-full bg-level-3/50 animate-pulse rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TopProducts = () => {
  const navigate = useNavigate();
  const { products, getProducts, productsLoading } = store();
  const { addToCart } = cartStore();
  useEffect(() => {
    getProducts();
  }, []);

  // Function to format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (productsLoading) return <TopProductsSkeleton />;
  return (
    <div className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto border-2 border-dashed border-level-4 border-t-0 border-b-0 p-4">
        {/* Header Section */}
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-4">
          Top Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              onClick={() => {
                navigate(`/product/${product._id}`);
              }}
              key={index}
              className="border-2 border-level-4 rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-level-5/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image Container */}
              <div className="relative h-52 overflow-hidden flex items-center justify-center p-4 bg-level-2/60">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-11/12 h-11/12 rounded-xl bg-level-1 object-cover transition-transform duration-300 "
                />
                {product.discount > 0 && (
                  <div className="absolute top-5 left-5 bg-level-5 text-white px-3 py-1 rounded-lg text-sm font-medium transform -rotate-12">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-4">
                {/* Category & Brand */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white bg-level-5 px-2 py-1 rounded-sm">
                    {product.category.name}
                  </span>
                  <span className="text-sm bg-level-5 py-1 px-2 rounded-sm text-white">
                    {product.brand}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-level-5 mb-2 truncate transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors ${
                          i < product.rating
                            ? "text-level-5 fill-level-5"
                            : "text-level-4"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-level-5/60 ml-2">
                    ({product.rating})
                  </span>
                </div>

                {/* Price & Stock */}
                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-level-5">
                      ৳
                      {formatPrice(
                        product.price - (product.price * product.discount) / 100
                      )}
                    </span>
                    {product.discount > 0 && (
                      <div className="text-sm text-level-5/80 line-through">
                        ৳{formatPrice(product.price)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm bg-level-5 px-3 py-1 rounded-full text-white">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id, 1);
                  }}
                  className="hover:bg-level-5 border-2 border-level-5 border-dashed text-level-5 rounded-xl flex items-center justify-center gap-2 w-full p-3 cursor-pointer hover:text-white font-medium transition-colors"
                >
                  Add To Cart
                  <ShoppingCart className="w-5 h-5 transform  transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
