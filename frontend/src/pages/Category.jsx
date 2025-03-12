import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import categoryStore from "../store/categoryStore";
import cartStore from "../store/cartStore";

// const data = {
//   category: {
//     _id: "67c7cc7a89578bbb5bd2a16b",
//     name: "Tech",
//     description: "tech related products ",
//     image: "default-category.png",
//     isActive: true,
//     createdAt: "2025-03-05T04:00:58.067Z",
//     updatedAt: "2025-03-05T04:00:58.067Z",
//     slug: "tech",
//     __v: 0,
//   },
//   products: {
//     items: [
//       {
//         _id: "67c9ae98652c0ffecd7477bb",
//         name: "computer",
//         price: 10000,
//         images: [
//           "https://res.cloudinary.com/dj5cslczv/image/upload/v1741270677/products/images-1741270676685-965844949_x5arbu.png",
//         ],
//         stock: 10,
//         rating: 0,
//         discount: 10,
//         slug: "computer",
//       },
//     ],
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 1,
//     hasMore: false,
//   },
// };

const CategorySkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar Skeleton */}
          <div className="lg:col-span-1 border-r-2 border-dashed border-level-4 p-4">
            {/* Filter Section Skeletons */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-4">
                <div className="flex items-center justify-between w-full p-2">
                  <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                  <div className="h-5 w-5 bg-level-3/50 animate-pulse rounded-lg"></div>
                </div>
                <div className="mt-2 space-y-2 pl-2">
                  {[1, 2, 3, 4].map((subItem) => (
                    <div key={subItem} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-level-3/50 animate-pulse rounded"></div>
                      <div className="h-4 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Products Grid Skeleton */}
          <div className="lg:col-span-3 p-4">
            {/* Category Title Skeleton */}
            <div className="h-8 w-48 bg-level-3/50 animate-pulse rounded-lg mb-4"></div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="border-2 border-level-4 rounded-xl overflow-hidden"
                >
                  {/* Image Skeleton */}
                  <div className="relative h-52 bg-level-3/50 animate-pulse p-4"></div>

                  {/* Product Info Skeleton */}
                  <div className="p-5 space-y-4">
                    {/* Category & Brand */}
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-16 bg-level-3/50 animate-pulse rounded-sm"></div>
                      <div className="h-6 w-16 bg-level-3/50 animate-pulse rounded-sm"></div>
                    </div>

                    {/* Title */}
                    <div className="h-7 w-3/4 bg-level-3/50 animate-pulse rounded-lg"></div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className="h-4 w-4 bg-level-3/50 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                      <div className="h-4 w-12 bg-level-3/50 animate-pulse rounded ml-2"></div>
                    </div>

                    {/* Price & Stock */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="space-y-1">
                        <div className="h-8 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-4 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                      <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-full"></div>
                    </div>

                    {/* Button */}
                    <div className="h-12 w-full bg-level-3/50 animate-pulse rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = () => {
  const { id } = useParams();
  const { addToCart } = cartStore();
  const { getCategory, data, loading } = categoryStore();
  useEffect(() => {
    getCategory(id);
  }, [id]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    rating: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: false,
    brand: false,
    rating: false,
  });

  const filterOptions = {
    price: ["0-1000", "1000-5000", "5000-10000", "10000+"],
    brand: ["Apple", "Samsung", "Dell", "HP"],
    rating: ["4+ Stars", "3+ Stars", "2+ Stars", "1+ Star"],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loading) return <CategorySkeleton />;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 border-r-2 border-dashed border-level-4 p-4">
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => toggleSection(category)}
                  className="flex items-center justify-between w-full p-2 text-level-5 hover:bg-level-2/60 rounded-lg transition-colors"
                >
                  <span className="font-medium capitalize">{category}</span>
                  {expandedSections[category] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSections[category] && (
                  <div className="mt-2 space-y-2 pl-2">
                    {options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-level-5/70 hover:text-level-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters[category].includes(option)}
                          onChange={() => handleFilterChange(category, option)}
                          className="form-checkbox border-2 border-dashed border-level-4 text-level-5 rounded bg-transparent focus:ring-level-5"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 p-4">
            <h1 className="text-2xl font-bold text-level-5 mb-4">
              {data.category.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.items.map((product) => {
                const discountedPrice =
                  product.price - (product.price * product.discount) / 100;

                return (
                  <div
                    key={product._id}
                    className="border-2 border-level-4 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${product._id}`}>
                      <div className="relative h-52 overflow-hidden flex items-center justify-center p-4 bg-level-2/60">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-11/12 h-11/12 rounded-xl bg-level-1 object-cover transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-5 left-5 bg-level-5 text-white px-3 py-1 rounded-lg text-sm font-medium transform -rotate-12">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-5 space-y-4">
                      {/* Product Name */}
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-xl font-bold text-level-5 mb-2 truncate transition-colors">
                          {product.name}
                        </h3>
                      </Link>

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
                            ৳{formatPrice(discountedPrice)}
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
                        onClick={() => addToCart(product._id)}
                        className="hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 rounded-xl flex items-center justify-center gap-2 w-full p-3 cursor-pointer hover:text-white font-medium transition-colors"
                      >
                        Add To Cart
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
