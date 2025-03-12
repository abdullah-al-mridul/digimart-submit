import React, { useState, useRef, useEffect, memo } from "react";
import {
  Package,
  Grid,
  Plus,
  Pencil,
  Trash,
  Search,
  Image as ImageIcon,
  X,
  Upload,
} from "lucide-react";
import adminStore from "../store/adminStore";

// Move UpdateForm outside and memoize it
const UpdateForm = memo(
  ({
    showUpdateForm,
    setShowUpdateForm,
    setSelectedItem,
    selectedItem,
    updateCategoryData,
    setUpdateCategoryData,
    updateFileInputRef,
    updateCatagory,
  }) => {
    if (!showUpdateForm) return null;

    const handleUpdateSubmit = (e) => {
      e.preventDefault();
      updateCatagory(updateCategoryData, selectedItem._id);
      setShowUpdateForm(false);
      setSelectedItem(null);
      setUpdateCategoryData({
        name: "",
        description: "",
        image: null,
      });
    };

    const handleUpdateChange = (e) => {
      const { name, value } = e.target;
      setUpdateCategoryData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-level-5">
              Update Category
            </h3>
            <button
              onClick={() => {
                setShowUpdateForm(false);
                setSelectedItem(null);
                setUpdateCategoryData({
                  name: "",
                  description: "",
                  image: null,
                });
              }}
              className="p-2 hover:bg-level-2/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-level-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdateSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={updateCategoryData.name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updateCategoryData.description}
                  onChange={handleUpdateChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors resize-none"
                  required
                />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Update Category
              </button>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-level-5 mb-2">
                Category Image
              </label>
              <div
                onClick={() => updateFileInputRef.current?.click()}
                className="border-2 border-dashed border-level-4 rounded-xl p-8 cursor-pointer hover:border-level-5 transition-colors h-full flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  {updateCategoryData.image ? (
                    <div className="relative">
                      <img
                        src={
                          typeof updateCategoryData.image === "string"
                            ? updateCategoryData.image
                            : URL.createObjectURL(updateCategoryData.image)
                        }
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUpdateCategoryData((prev) => ({
                            ...prev,
                            image: null,
                          }));
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-level-5/50" />
                      <p className="text-level-5/70 text-sm text-center">
                        Click to upload or drag and drop
                        <br />
                        SVG, PNG, JPG or GIF (max. 2MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={updateFileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUpdateCategoryData((prev) => ({
                        ...prev,
                        image: file,
                      }));
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

// Create a new UpdateProductForm component
const UpdateProductForm = memo(
  ({
    showUpdateForm,
    setShowUpdateForm,
    setSelectedItem,
    selectedItem,
    updateProductData,
    setUpdateProductData,
    updateFileInputRef,
    updateProduct,
    categories,
  }) => {
    if (!showUpdateForm) return null;

    const handleUpdateSubmit = (e) => {
      e.preventDefault();
      updateProduct(updateProductData, selectedItem._id);
      setShowUpdateForm(false);
      setSelectedItem(null);
      setUpdateProductData({
        name: "",
        description: "",
        images: [],
        price: "",
        category: "",
        brand: "",
        stock: "",
        discount: "",
        rating: 0,
        isFeatured: false,
      });
    };

    const handleUpdateChange = (e) => {
      const { name, value } = e.target;
      setUpdateProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-level-5">
              Update Product
            </h3>
            <button
              onClick={() => {
                setShowUpdateForm(false);
                setSelectedItem(null);
                setUpdateProductData({
                  name: "",
                  description: "",
                  images: [],
                  price: "",
                  category: "",
                  brand: "",
                  stock: "",
                  discount: "",
                  rating: 0,
                  isFeatured: false,
                });
              }}
              className="p-2 hover:bg-level-2/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-level-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdateSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={updateProductData.name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updateProductData.description}
                  onChange={handleUpdateChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors resize-none"
                  required
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-level-5 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={updateProductData.price}
                    onChange={handleUpdateChange}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-level-5 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={updateProductData.stock}
                    onChange={handleUpdateChange}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Category & Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-level-5 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={updateProductData.category}
                    onChange={handleUpdateChange}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-level-5 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={updateProductData.discount}
                    onChange={handleUpdateChange}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={updateProductData.brand}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={updateProductData.rating}
                  onChange={handleUpdateChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                  required
                />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Update Product
              </button>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-level-5 mb-2">
                Product Images (Max 5)
              </label>
              <div
                onClick={() => updateFileInputRef.current?.click()}
                className="border-2 border-dashed border-level-4 rounded-xl p-8 cursor-pointer hover:border-level-5 transition-colors h-full flex items-center justify-center"
              >
                <div className="w-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {updateProductData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpdateProductData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }));
                          }}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {updateProductData.images.length < 5 && (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-12 h-12 text-level-5/50" />
                      <p className="text-level-5/70 text-sm text-center">
                        Click to upload or drag and drop
                        <br />
                        SVG, PNG, JPG or GIF (max. 2MB)
                        <br />
                        {updateProductData.images.length}/5 images
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={updateFileInputRef}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length + updateProductData.images.length > 5) {
                    alert("You can only upload up to 5 images");
                    return;
                  }
                  setUpdateProductData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...files].slice(0, 5),
                  }));
                }}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
);
const ControlSkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 mb-8"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-level-3/50 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-6 w-32 bg-level-3/50 rounded-lg mb-2"></div>
                  <div className="h-4 w-24 bg-level-3/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Controll = () => {
  const {
    categories,
    loadingControl,
    getControl,
    products,
    addCatagory,
    deleteCatagory,
    updateCatagory,
    addProduct,
    updateProduct,
    deleteProduct,
  } = adminStore();
  const [activeTab, setActiveTab] = useState("categories"); // or "products"
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const addFileInputRef = useRef(null);
  const updateFileInputRef = useRef(null);
  useEffect(() => {
    getControl();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [updateCategoryData, setUpdateCategoryData] = useState({
    name: "",
    description: "",
    image: null,
  });
  // Product Create State
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
    rating: 0,
    isFeatured: false,
  });

  // Product Update State
  const [updateProductData, setUpdateProductData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
    rating: 0,
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (activeTab === "categories") {
      // Single image for category
      setNewCategoryData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      // Multiple images for product (max 5)
      if (files.length + newProductData.images.length > 5) {
        alert("You can only upload up to 5 images");
        return;
      }
      setNewProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5),
      }));
    }
  };

  const removeImage = (index) => {
    setNewProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowUpdateForm(true);
    setShowAddForm(false);

    if (activeTab === "categories") {
      setUpdateCategoryData({
        name: item.name,
        description: item.description,
        image: item.image,
      });
    } else {
      setUpdateProductData({
        name: item.name,
        description: item.description,
        images: [],
        price: item.price,
        category: item.category._id,
        brand: item.brand,
        stock: item.stock,
        discount: item.discount || "",
        rating: item.rating || 0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "categories") {
      addCatagory(newCategoryData);
    } else {
      addProduct(newProductData);
    }
    setShowAddForm(false);
    // Reset form data
    if (activeTab === "categories") {
      setNewCategoryData({
        name: "",
        description: "",
        image: null,
      });
    } else {
      setNewProductData({
        name: "",
        description: "",
        images: [],
        price: "",
        category: "",
        brand: "",
        stock: "",
        discount: "",
      });
    }
  };

  // Update the form header and button text based on edit mode
  const getFormTitle = () => {
    if (selectedItem) {
      return `Update ${activeTab === "categories" ? "Category" : "Product"}`;
    }
    return `Add New ${activeTab === "categories" ? "Category" : "Product"}`;
  };

  // Update the submit button text based on edit mode
  const getSubmitButtonText = () => {
    if (selectedItem) {
      return `Update ${activeTab === "categories" ? "Category" : "Product"}`;
    }
    return `Add ${activeTab === "categories" ? "Category" : "Product"}`;
  };

  // Add this handler for new product form
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loadingControl) return <ControlSkeleton />;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7">
            Control Zone
          </h2>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setShowUpdateForm(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
          >
            {showAddForm ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {getFormTitle()}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8 border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <h3 className="text-2xl font-semibold text-level-5 mb-6">
              {getFormTitle()}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-level-5 mb-2"
                  >
                    {activeTab === "categories" ? "Category" : "Product"} Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={
                      activeTab === "categories"
                        ? newCategoryData.name
                        : newProductData.name
                    }
                    onChange={(e) => {
                      activeTab === "categories"
                        ? setNewCategoryData({
                            ...newCategoryData,
                            name: e.target.value,
                          })
                        : setNewProductData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                    }}
                    required
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                    placeholder={`Enter ${
                      activeTab === "categories" ? "category" : "product"
                    } name`}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-level-5 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={
                      activeTab === "categories"
                        ? newCategoryData.description
                        : newProductData.description
                    }
                    onChange={(e) => {
                      activeTab === "categories"
                        ? setNewCategoryData({
                            ...newCategoryData,
                            description: e.target.value,
                          })
                        : setNewProductData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                    }}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors resize-none"
                    placeholder={`Enter ${
                      activeTab === "categories" ? "category" : "product"
                    } description`}
                  />
                </div>

                {/* Product-specific fields */}
                {activeTab === "products" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={newProductData.price}
                          onChange={handleNewProductChange}
                          required
                          min="0"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter price"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={newProductData.stock}
                          onChange={handleNewProductChange}
                          required
                          min="0"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter stock"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={newProductData.category}
                          onChange={handleNewProductChange}
                          required
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 focus:outline-none focus:border-level-5 transition-colors"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="discount"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          value={newProductData.discount}
                          onChange={handleNewProductChange}
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter discount"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium text-level-5 mb-2"
                      >
                        Brand
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={newProductData.brand}
                        onChange={handleNewProductChange}
                        required
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                        placeholder="Enter brand name"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-level-5 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={newProductData.rating}
                        onChange={handleNewProductChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                        placeholder="Enter rating (0-5)"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
                >
                  {getSubmitButtonText()}
                </button>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  {activeTab === "categories"
                    ? "Category Image"
                    : "Product Images (Max 5)"}
                </label>
                <div
                  onClick={() => addFileInputRef.current?.click()}
                  className="border-2 border-dashed border-level-4 rounded-xl p-8 cursor-pointer hover:border-level-5 transition-colors h-full flex items-center justify-center"
                >
                  {activeTab === "categories" ? (
                    // Category single image upload
                    <div className="flex flex-col items-center gap-2">
                      {newCategoryData.image ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(newCategoryData.image)}
                            alt="Preview"
                            className="w-48 h-48 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewCategoryData((prev) => ({
                                ...prev,
                                image: null,
                              }));
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-level-5/50" />
                          <p className="text-level-5/70 text-sm text-center">
                            Click to upload or drag and drop
                            <br />
                            SVG, PNG, JPG or GIF (max. 2MB)
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    // Product multiple images upload
                    <div className="w-full">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {newProductData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {newProductData.images.length < 5 && (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-12 h-12 text-level-5/50" />
                          <p className="text-level-5/70 text-sm text-center">
                            Click to upload or drag and drop
                            <br />
                            SVG, PNG, JPG or GIF (max. 2MB)
                            <br />
                            {newProductData.images.length}/5 images
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    ref={addFileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple={activeTab === "products"}
                    className="hidden"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Update Forms */}
        {activeTab === "categories" ? (
          <UpdateForm
            showUpdateForm={showUpdateForm}
            setShowUpdateForm={setShowUpdateForm}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            updateCategoryData={updateCategoryData}
            setUpdateCategoryData={setUpdateCategoryData}
            updateFileInputRef={updateFileInputRef}
            updateCatagory={updateCatagory}
          />
        ) : (
          <UpdateProductForm
            showUpdateForm={showUpdateForm}
            setShowUpdateForm={setShowUpdateForm}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            updateProductData={updateProductData}
            setUpdateProductData={setUpdateProductData}
            updateFileInputRef={updateFileInputRef}
            updateProduct={updateProduct}
            categories={categories}
          />
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-colors ${
              activeTab === "categories"
                ? "border-level-5 text-level-5 bg-level-2/60"
                : "border-level-4 text-level-5/70 hover:border-level-5 hover:text-level-5"
            }`}
          >
            <Grid className="w-5 h-5" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-colors ${
              activeTab === "products"
                ? "border-level-5 text-level-5 bg-level-2/60"
                : "border-level-4 text-level-5/70 hover:border-level-5 hover:text-level-5"
            }`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
          />
          <Search className="w-5 h-5 text-level-5/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "categories" ? (
            // Categories Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-level-3 rounded-xl flex items-center justify-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-level-5">
                        {category.name}
                      </h3>
                      <p className="text-level-5/70 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        deleteCatagory(category._id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Products Table
            <div className="border-2 border-dashed border-level-4 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-level-2/60 border-b-2 border-dashed border-level-4">
                  <tr>
                    <th className="text-left p-4 text-level-5">Product</th>
                    <th className="text-left p-4 text-level-5">Category</th>
                    <th className="text-left p-4 text-level-5">Price</th>
                    <th className="text-left p-4 text-level-5">Stock</th>
                    <th className="text-right p-4 text-level-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-dashed border-level-4 last:border-none hover:bg-level-2/60"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-level-3 rounded-lg flex items-center justify-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-level-5">
                              {product.name}
                            </h4>
                            <p className="text-sm text-level-5/70">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-level-5">
                        {product.category.name}
                      </td>
                      <td className="p-4 text-level-5">৳{product.price}</td>
                      <td className="p-4 text-level-5">{product.stock}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            {/* {console.log(product)} */}
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              deleteProduct(product._id);
                            }}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controll;
