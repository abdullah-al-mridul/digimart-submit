import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Link } from "react-router-dom";
import cartStore from "../store/cartStore";

const CartSkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title Skeleton */}
            <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7"></div>

            {/* Cart Items List Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                >
                  <div className="flex gap-4">
                    {/* Product Image Skeleton */}
                    <div className="w-24 h-24 bg-level-3/50 animate-pulse rounded-lg"></div>

                    {/* Product Details Skeleton */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between">
                        <div className="h-7 w-48 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-7 w-7 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                      <div className="h-5 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>

                      {/* Price Skeleton */}
                      <div className="flex items-baseline gap-2">
                        <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                        <div className="h-4 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>

                      {/* Quantity Controls Skeleton */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-level-3/50 animate-pulse rounded-l-lg"></div>
                          <div className="h-8 w-16 bg-level-3/50 animate-pulse"></div>
                          <div className="h-8 w-8 bg-level-3/50 animate-pulse rounded-r-lg"></div>
                        </div>
                        <div className="h-5 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                      </div>
                    </div>

                    {/* Item Total Skeleton */}
                    <div className="text-right">
                      <div className="h-7 w-24 bg-level-3/50 animate-pulse rounded-lg ml-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="border-2 border-dashed border-level-4 rounded-xl p-6 space-y-6">
              <div className="h-8 w-40 bg-level-3/50 animate-pulse rounded-lg"></div>

              <div className="space-y-4">
                {/* Summary Items */}
                {[1, 2].map((item) => (
                  <div key={item} className="flex justify-between">
                    <div className="h-6 w-20 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-6 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t-2 border-dashed border-level-4 pt-4">
                  <div className="flex justify-between">
                    <div className="h-7 w-24 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-7 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Checkout Button Skeleton */}
              <div className="h-12 w-full bg-level-3/50 animate-pulse rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, loading, getCart, updateCart, deleteCart, placeOrder } =
    cartStore();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
    },
    paymentMethod: {
      type: "cash_on_delivery",
      details: "",
    },
  });

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  const formatPrice = (price) => {
    return Math.floor(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  //   return null;
  if (loading) return <CartSkeleton />;
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setShowCheckoutForm(false);
    console.log("Checkout Data:", checkoutData);
    placeOrder(checkoutData);
  };
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {showCheckoutForm && (
          <div className="mb-8 border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <h2 className="text-2xl font-semibold text-level-5 mb-6">
              Checkout
            </h2>
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-medium text-level-5 mb-4">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={checkoutData.street}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            street: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={checkoutData.city}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            city: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={checkoutData.state}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            state: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={checkoutData.postalCode}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            postalCode: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={checkoutData.country}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            country: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            phone: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium text-level-5 mb-4">
                  Payment Method
                </h3>
                <select
                  value={checkoutData.paymentMethod.type}
                  onChange={(e) =>
                    setCheckoutData((prev) => ({
                      ...prev,
                      paymentMethod: {
                        ...prev.paymentMethod,
                        type: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 focus:outline-none focus:border-level-5 transition-colors"
                  required
                >
                  <option value="cash_on_delivery">Cash on Delivery</option>
                  <option value="bkash">bKash</option>
                </select>
                <h2 className="text-level-5  mt-2 mb-2 text-lg">Details</h2>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 focus:outline-none focus:border-level-5 transition-colors"
                  value={checkoutData.paymentMethod.details}
                  onChange={(e) =>
                    setCheckoutData((prev) => ({
                      ...prev,
                      paymentMethod: {
                        ...prev.paymentMethod,
                        details: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Place Order
                </button>
              </div>
            </form>
          </div>
        )}
        {cart?.items?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7">
                Shopping Cart ({cart.items.length})
              </h2>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.items.map((item) => {
                  const discountedPrice =
                    item.product.price -
                    (item.product.price * item.product.discount) / 100;
                  //   const itemTotal = discountedPrice * item.quantity;
                  const itemTotal = discountedPrice * item.quantity;
                  return (
                    <div
                      key={item._id}
                      className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 border-2 border-dashed border-level-4 rounded-lg p-2 bg-level-1">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <h3 className="text-xl font-semibold text-level-5 capitalize">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => deleteCart(item._id)}
                              className="text-level-5 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-level-5/70">
                            Brand: {item.product.brand}
                          </p>

                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-level-5">
                              ৳{formatPrice(discountedPrice)}
                            </span>
                            {item.product.discount > 0 && (
                              <span className="text-sm text-level-5/70 line-through">
                                ৳{formatPrice(item.product.price)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => {
                                  updateCart(item._id, item.quantity - 1);
                                }}
                                disabled={item.quantity === 1}
                                className="p-1 text-level-5 border-l-2 border-t-2 border-b-2 border-dashed rounded-bl-lg hover:text-white border-level-4 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-level-4 disabled:cursor-not-allowed hover:bg-level-4 cursor-pointer rounded-tl-lg transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-1 text-level-5 min-w-[50px] border-2 border-dashed border-level-4 flex items-center justify-center">
                                <NumberFlow value={item.quantity} />
                              </span>
                              <button
                                onClick={() => {
                                  updateCart(item._id, item.quantity + 1);
                                }}
                                disabled={item.product.stock === item.quantity}
                                className="p-1 text-level-5 border-2 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-level-4 disabled:cursor-not-allowed border-l-0 border-dashed rounded-tr-lg rounded-br-lg hover:text-white hover:bg-level-4 border-level-4 cursor-pointer transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-level-5/70 text-sm">
                              {item.product.stock} pieces available
                            </span>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-lg font-bold text-level-5">
                            ৳{formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border-2 border-dashed border-level-4 rounded-xl p-6 space-y-6 sticky top-4">
                <h3 className="text-2xl font-semibold text-level-5">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-level-5">
                    <span>Subtotal</span>
                    <span>৳{formatPrice(cart.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-level-5">
                    <span>Shipping</span>
                    <span>৳0</span>
                  </div>
                  <div className="border-t-2 border-dashed border-level-4 pt-4">
                    <div className="flex justify-between text-level-5 font-bold">
                      <span>Total</span>
                      <span>৳{formatPrice(cart.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-level-5 mb-4">
              Your cart is empty
            </h2>
            <p className="text-level-5/70 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
