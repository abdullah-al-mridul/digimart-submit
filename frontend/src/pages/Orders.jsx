import React, { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import ordersStore from "../store/ordersRoute";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";

const OrdersSkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 mb-8"></div>

        {/* Orders List Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((order) => (
            <div
              key={order}
              className="border-2 border-dashed border-level-4 rounded-xl overflow-hidden"
            >
              {/* Order Header Skeleton */}
              <div className="bg-level-2/60 p-4 border-b-2 border-dashed border-level-4">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="space-y-1">
                    <div className="h-5 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="h-5 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Order Items Skeleton */}
              <div className="p-4 space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 p-4 border-2 border-dashed border-level-4 rounded-xl bg-level-2/30"
                  >
                    {/* Product Image Skeleton */}
                    <div className="w-20 h-20 bg-level-3/50 animate-pulse rounded-lg"></div>

                    {/* Product Details Skeleton */}
                    <div className="flex-1">
                      <div className="h-7 w-48 bg-level-3/50 animate-pulse rounded-lg mb-2"></div>
                      <div className="h-5 w-32 bg-level-3/50 animate-pulse rounded-lg mb-2"></div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Summary Skeleton */}
                <div className="flex flex-wrap gap-6 justify-between items-start mt-4 pt-4 border-t-2 border-dashed border-level-4">
                  {/* Shipping Address Skeleton */}
                  <div className="space-y-2">
                    <div className="h-6 w-36 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="space-y-1">
                      {[1, 2, 3, 4].map((line) => (
                        <div
                          key={line}
                          className="h-5 w-48 bg-level-3/50 animate-pulse rounded-lg"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Order Status Skeleton */}
                  <div className="space-y-2">
                    <div className="h-6 w-28 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                      <div className="h-5 w-40 bg-level-3/50 animate-pulse rounded-lg"></div>
                      <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg"></div>
                    </div>
                  </div>

                  {/* Order Total Skeleton */}
                  <div className="space-y-2">
                    <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="space-y-1">
                      <div className="flex justify-between gap-8">
                        <div className="h-5 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-5 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                      <div className="flex justify-between gap-8">
                        <div className="h-5 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-5 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                      <div className="flex justify-between gap-8">
                        <div className="h-6 w-16 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-6 w-28 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const { orders, getOrders, loading } = ordersStore();
  useEffect(() => {
    getOrders();
  }, []);
  const api = useApi();
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-blue-500";
      case "shipped":
        return "text-yellow-500";
      case "delivered":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-level-5";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-level-5";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const needsPayment = (order) => {
    return (
      order.paymentStatus === "pending" || order.paymentStatus === "failed"
    );
  };

  const handlePayment = async (orderId) => {
    const res = await toast.promise(api.post(`/payment`, { orderId }), {
      loading: "Processing payment...",
      success: "Payment processed successfully!",
      error: "Failed to process payment.",
    });
    const redirectUrl = res.redirectUrl;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  if (loading) return <OrdersSkeleton />;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
          My Orders
        </h2>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border-2 border-dashed border-level-4 rounded-xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-level-2/60 p-4 border-b-2 border-dashed border-level-4">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-level-5/70">Order ID</p>
                      <p className="font-medium text-level-5">#{order._id}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-level-5/70">Order Date</p>
                      <p className="font-medium text-level-5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-4 border-2 border-dashed border-level-4 rounded-xl bg-level-2/30"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item.product._id}`}
                        className="w-20 h-20 border-2 border-dashed border-level-4 rounded-lg p-2 bg-level-1"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-lg font-semibold text-level-5 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-level-5/70">
                          Brand: {item.product.brand}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-level-5">
                            ৳{formatPrice(item.price)} × {item.quantity}
                          </p>
                          <p className="font-semibold text-level-5">
                            ৳{formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="flex flex-wrap gap-6 justify-between items-start mt-4 pt-4 border-t-2 border-dashed border-level-4">
                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Shipping Address
                      </h4>
                      <div className="text-level-5/70">
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Order Status with Pay Now Button */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Order Status
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                        <span className="text-level-5/50">|</span>
                        <span
                          className={`${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-level-5/70">
                        Payment Method: {order.paymentMethod.type}
                      </p>
                      {needsPayment(order) && (
                        <button
                          onClick={() => {
                            handlePayment(order._id);
                          }}
                          className="mt-2 w-full cursor-pointer bg-level-5 text-white py-2 px-4 rounded-lg hover:bg-level-5/90 transition-colors flex items-center justify-center gap-2"
                        >
                          Pay Now ৳{formatPrice(order.total)}
                        </button>
                      )}
                    </div>

                    {/* Order Total */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Order Total
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-8">
                          <span className="text-level-5/70">Subtotal:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.subtotal)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span className="text-level-5/70">Shipping:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.shippingCost)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-8 font-semibold">
                          <span className="text-level-5">Total:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-level-5 mb-4">
              No orders yet
            </h2>
            <p className="text-level-5/70 mb-8">
              Looks like you haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
