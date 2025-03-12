import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
const api = useApi();

const adminStore = create((set, get) => ({
  loading: true,
  dashboard: null,
  orders: [],
  categories: [],
  loadingControl: true,
  products: [],
  getDashboard: async () => {
    set({
      loading: true,
    });
    try {
      const res = await api.get("/admin/dashboard");
      const orders = await api.get("/admin/orders");
      set({
        dashboard: res.data,
        orders: [...orders.data],
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({
        loading: false,
      });
    }
  },
  getControl: async () => {
    set({
      loadingControl: true,
    });
    try {
      const res = await api.get("/categories");
      const products = await api.get("/products");

      set({
        categories: res.categories,
      });
      set({
        products: products.products,
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({
        loadingControl: false,
      });
    }
  },
  addCatagory: async (newCategoryData) => {
    try {
      const form = new FormData();
      form.append("name", newCategoryData.name);
      form.append("description", newCategoryData.description);
      form.append("image", newCategoryData.image);

      const res = await toast.promise(
        api.post("/categories", form), // API Call
        {
          loading: "Adding category...", // Loading text
          success: "Category added successfully!", // Success text
          error: "Failed to add category.", // Error text
        }
      );

      set({
        categories: [...get().categories, res.category],
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  deleteCatagory: async (catId) => {
    try {
      const res = await toast.promise(api.delete(`/categories/${catId}`), {
        loading: "Deleting category...",
        success: "Category deleted successfully!",
        error: "Failed to delete category.",
      });
      set({
        categories: get().categories.filter(
          (category) => category._id !== catId
        ),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  updateCatagory: async (updateCategoryData, catId) => {
    try {
      const form = new FormData();
      form.append("name", updateCategoryData.name);
      form.append("description", updateCategoryData.description);
      if (updateCategoryData.image instanceof File) {
        form.append("image", updateCategoryData.image);
      }

      const res = await toast.promise(api.put(`/categories/${catId}`, form), {
        loading: "Updating category...",
        success: "Category update successfully!",
        error: "Failed to update category.",
      });

      set({
        categories: get().categories.map((cat) =>
          cat._id === catId ? res.category : cat
        ),
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  addProduct: async (newProductData) => {
    try {
      const form = new FormData();
      form.append("name", newProductData.name);
      form.append("description", newProductData.description);
      form.append("price", newProductData.price);
      form.append("stock", newProductData.stock);
      form.append("brand", newProductData.brand);
      form.append("category", newProductData.category);
      form.append("discount", newProductData.discount);
      form.append("rating", newProductData.rating);
      newProductData.images.forEach((image) => {
        form.append("images", image);
      });

      const res = await toast.promise(
        api.post("/products", form), // API Call
        {
          loading: "Adding product...", // Loading text
          success: "Product added successfully!", // Success text
          error: "Failed to add product.", // Error text
        }
      );
      set({
        products: [...get().products, res.product],
      });
      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  deleteProduct: async (productId) => {
    try {
      const res = await toast.promise(
        api.delete(`/products/${productId}`), // API Call
        {
          loading: "Deleting product...", // Loading text
          success: "Product deleted successfully!", // Success text
          error: "Failed to delete product.", // Error text
        }
      );

      set({
        products: get().products.filter((product) => product._id !== productId),
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  updateProduct: async (updateProductData, productId) => {
    try {
      const form = new FormData();
      form.append("name", updateProductData.name);
      form.append("description", updateProductData.description);
      form.append("price", updateProductData.price);
      form.append("stock", updateProductData.stock);
      form.append("brand", updateProductData.brand);
      form.append("category", updateProductData.category);
      form.append("discount", updateProductData.discount);
      form.append("rating", updateProductData.rating);
      updateProductData.images.forEach((image) => {
        form.append("images", image);
      });

      const res = await toast.promise(
        api.put(`/products/${productId}`, form), // API Call
        {
          loading: "Updating product...", // Loading text
          success: "Product updated successfully!", // Success text
          error: "Failed to update product.", // Error text
        }
      );
      set({
        products: get().products.map((product) =>
          product._id === productId ? res.product : product
        ),
      });
      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const res = await toast.promise(
        api.put(`/orders/${orderId}/status`, { status: newStatus }), // API Call
        {
          loading: "Updating order status...", // Loading text
          success: "Order status updated successfully!", // Success text
          error: "Failed to update order status.", // Error text
        }
      );
      set({
        orders: get().orders.map((order) =>
          order._id === orderId ? res.order : order
        ),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default adminStore;
