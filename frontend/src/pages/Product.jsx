import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Link, useParams } from "react-router-dom";
import productStore from "../store/productStore";
import store from "../store/store";
import cartStore from "../store/cartStore";
import wishlistStore from "../store/wishlistStore";

const ProductSkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60">
              <div className="w-full h-96 bg-level-3/50 animate-pulse rounded-lg"></div>
            </div>

            {/* Thumbnail Images Skeleton */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="border-2 border-dashed border-level-4 rounded-lg p-2 bg-level-2/60 min-w-[80px]"
                >
                  <div className="w-16 h-16 bg-level-3/50 animate-pulse rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Category & Brand Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
              <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-10 w-3/4 bg-level-3/50 animate-pulse rounded-lg"></div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="w-6 h-6 bg-level-3/50 animate-pulse rounded"
                  ></div>
                ))}
              </div>
              <div className="h-6 w-16 bg-level-3/50 animate-pulse rounded-lg"></div>
            </div>

            {/* Price Section Skeleton */}
            <div className="space-y-2">
              <div className="h-10 w-40 bg-level-3/50 animate-pulse rounded-lg"></div>
              <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-4 w-5/6 bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-4 w-4/6 bg-level-3/50 animate-pulse rounded-lg"></div>
              </div>
            </div>

            {/* Quantity Controls Skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-level-3/50 animate-pulse rounded-l-lg"></div>
                <div className="h-10 w-16 bg-level-3/50 animate-pulse"></div>
                <div className="h-10 w-10 bg-level-3/50 animate-pulse rounded-r-lg"></div>
              </div>
              <div className="h-6 w-40 bg-level-3/50 animate-pulse rounded-lg"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 h-12 bg-level-3/50 animate-pulse rounded-xl"></div>
              <div className="h-12 w-12 bg-level-3/50 animate-pulse rounded-xl"></div>
              <div className="h-12 w-12 bg-level-3/50 animate-pulse rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Similar Products Section Skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-level-3/50 animate-pulse rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border-2 border-level-4 rounded-xl overflow-hidden"
              >
                {/* Product Image Skeleton */}
                <div className="relative h-52 bg-level-2/60 p-4">
                  <div className="w-full h-full bg-level-3/50 animate-pulse rounded-lg"></div>
                </div>

                {/* Product Info Skeleton */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-sm"></div>
                    <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-sm"></div>
                  </div>
                  <div className="h-7 w-3/4 bg-level-3/50 animate-pulse rounded-lg"></div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-4 h-4 bg-level-3/50 animate-pulse rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-full"></div>
                  </div>
                  <div className="h-12 w-full bg-level-3/50 animate-pulse rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const { getProduct, products, product, loading } = productStore();
  const { addToCart } = cartStore();
  const { addToWishlist } = wishlistStore();
  useEffect(() => {
    getProduct(id);
  }, [id]);
  useEffect(() => {
    console.log(product);
  }, [product]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  //   const products = [
  //     {
  //       name: "bettary",
  //       description: "bettary description",
  //       price: 10000,
  //       images: [
  //         "https://res.cloudinary.com/dj5cslczv/image/upload/v1741166875/products/images-1741166874529-296506118_vmn6ge.png",
  //       ],
  //       category: {
  //         _id: "67c7cc7a89578bbb5bd2a16b",
  //         name: "Tech",
  //         description: "tech releated products",
  //         image: "default-category.png",
  //         isActive: true,
  //         createdAt: "2025-03-05T04:00:58.067Z",
  //         updatedAt: "2025-03-05T04:00:58.067Z",
  //         slug: "tech",
  //         __v: 0,
  //       },
  //       brand: "tech",
  //       stock: 10,
  //       rating: 4,
  //       discount: 10,
  //       isFeatured: true,
  //       createdAt: "2025-03-05T09:27:56.384Z",
  //       updatedAt: "2025-03-06T03:39:27.034Z",
  //       slug: "bettary",
  //     },
  //     {
  //       name: "bettary",
  //       description: "bettary description",
  //       price: 10000,
  //       images: [
  //         "https://res.cloudinary.com/dj5cslczv/image/upload/v1741166875/products/images-1741166874529-296506118_vmn6ge.png",
  //       ],
  //       category: {
  //         _id: "67c7cc7a89578bbb5bd2a16b",
  //         name: "Tech",
  //         description: "tech releated products",
  //         image: "default-category.png",
  //         isActive: true,
  //         createdAt: "2025-03-05T04:00:58.067Z",
  //         updatedAt: "2025-03-05T04:00:58.067Z",
  //         slug: "tech",
  //         __v: 0,
  //       },
  //       brand: "tech",
  //       stock: 10,
  //       rating: 0,
  //       discount: 10,
  //       isFeatured: true,
  //       createdAt: "2025-03-05T09:27:56.384Z",
  //       updatedAt: "2025-03-06T03:39:27.034Z",
  //       slug: "bettary",
  //     },
  //     {
  //       name: "bettary",
  //       description: "bettary description",
  //       price: 10000,
  //       images: [
  //         "https://res.cloudinary.com/dj5cslczv/image/upload/v1741166875/products/images-1741166874529-296506118_vmn6ge.png",
  //       ],
  //       category: {
  //         _id: "67c7cc7a89578bbb5bd2a16b",
  //         name: "Tech",
  //         description: "tech releated products",
  //         image: "default-category.png",
  //         isActive: true,
  //         createdAt: "2025-03-05T04:00:58.067Z",
  //         updatedAt: "2025-03-05T04:00:58.067Z",
  //         slug: "tech",
  //         __v: 0,
  //       },
  //       brand: "tech",
  //       stock: 10,
  //       rating: 0,
  //       discount: 10,
  //       isFeatured: true,
  //       createdAt: "2025-03-05T09:27:56.384Z",
  //       updatedAt: "2025-03-06T03:39:27.034Z",
  //       slug: "bettary",
  //     },
  //     {
  //       name: "bettary",
  //       description: "bettary description",
  //       price: 10000,
  //       images: [
  //         "https://res.cloudinary.com/dj5cslczv/image/upload/v1741166875/products/images-1741166874529-296506118_vmn6ge.png",
  //       ],
  //       category: {
  //         _id: "67c7cc7a89578bbb5bd2a16b",
  //         name: "Tech",
  //         description: "tech releated products",
  //         image: "default-category.png",
  //         isActive: true,
  //         createdAt: "2025-03-05T04:00:58.067Z",
  //         updatedAt: "2025-03-05T04:00:58.067Z",
  //         slug: "tech",
  //         __v: 0,
  //       },
  //       brand: "tech",
  //       stock: 10,
  //       rating: 0,
  //       discount: 10,
  //       isFeatured: true,
  //       createdAt: "2025-03-05T09:27:56.384Z",
  //       updatedAt: "2025-03-06T03:39:27.034Z",
  //       slug: "bettary",
  //     },
  //   ];
  //   const product = {
  //     _id: "67c8191c68175954d604f8fa",
  //     name: "bettary",
  //     description: "bettary description okay",
  //     price: 10000,
  //     images: [
  //       "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262389/products/images-1741262388773-268977497_xplciq.png",
  //       "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262390/products/images-1741262388776-340431677_bqbadr.png",
  //       "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262391/products/images-1741262388776-271590988_wmeynf.jpg",
  //     ],
  //     category: null,
  //     brand: "tech",
  //     stock: 10,
  //     rating: 5,
  //     discount: 80,
  //     isFeatured: true,
  //     createdAt: "2025-03-05T09:27:56.384Z",
  //     updatedAt: "2025-03-06T11:59:53.388Z",
  //     slug: "bettary",
  //   };

  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate discounted price
  if (loading) return <ProductSkeleton />;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  //   return null;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 border-dashed ${
                    selectedImage === index
                      ? "border-level-5"
                      : "border-level-4"
                  } rounded-lg p-2 bg-level-2/60 ${
                    selectedImage === index ? " bg-level-3/60" : ""
                  } min-w-[80px] transition-colors`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Brand */}
            <div>
              <h1 className="text-3xl font-bold text-level-5 capitalize">
                {product.name}
              </h1>
              <p className="text-level-5/70 mt-2">Brand: {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < product.rating
                      ? "text-level-5 fill-level-5"
                      : "text-level-4"
                  }`}
                />
              ))}
              <span className="text-level-5/70">
                ({product.rating} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-level-5">
                  ৳{discountedPrice.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-level-5/70 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <span className="inline-block bg-level-5 text-white px-3 py-1 rounded-md text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-level-5/70">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-level-5">Quantity:</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 text-level-5 border-l-2 border-t-2 border-b-2 border-dashed rounded-bl-lg hover:text-white border-level-4 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-level-4 disabled:cursor-not-allowed hover:bg-level-4 cursor-pointer rounded-tl-lg transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-level-5 min-w-[60px] border-2 border-dashed border-level-4 flex items-center justify-center">
                  <NumberFlow value={quantity} />
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 text-level-5 border-2 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-level-4 disabled:cursor-not-allowed border-l-0 border-dashed rounded-tr-lg rounded-br-lg hover:text-white hover:bg-level-4 border-level-4  cursor-pointer transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-level-5/70">
                {product.stock} pieces available
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(product._id, quantity);
                }}
                className="flex-1 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl  transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToWishlist(product._id);
                }}
                className="p-3 border-2 hover:text-white hover:bg-level-5 cursor-pointer border-dashed border-level-4 rounded-xl text-level-5 hover:border-level-5 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 border-2 border-dashed hover:text-white hover:bg-level-5 cursor-pointer border-level-4 rounded-xl text-level-5 hover:border-level-5 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Header Section */}
      </div>
      <div className=" border-t-2 border-level-4 border-dashed">
        <div className=" container p-8 border-r-2 border-l-2 border-level-4 border-dashed mx-auto">
          <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-4">
            Related Products
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                to={`/product/${product._id}`}
                key={index}
                className="border-2 border-level-4 rounded-xl overflow-hidden group cursor-pointer   transition-all duration-300 hover:-translate-y-1"
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
                          product.price -
                            (product.price * product.discount) / 100
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
                  <button className="hover:bg-level-5 border-2 border-level-5 border-dashed text-level-5 rounded-xl flex items-center justify-center gap-2 w-full p-3 cursor-pointer hover:text-white font-medium transition-colors">
                    Add To Cart
                    <ShoppingCart className="w-5 h-5 transform  transition-transform" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
