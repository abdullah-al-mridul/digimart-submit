import React from "react";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-6 bg-green-50 rounded-full border-2 border-dashed border-green-500">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-level-5 mb-4">
            Payment Successful!
          </h1>
          <p className="text-level-5/70 mb-8 text-lg">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>

          {/* Order Summary Card */}
          <div className="bg-level-2/60 border-2 border-dashed border-level-4 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-level-5 mb-4">
              <Package className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            <div className="space-y-2 text-level-5/70">
              <p>
                Order ID: <span className="text-level-5">#123456789</span>
              </p>
              <p>
                Amount Paid: <span className="text-level-5">৳20,000</span>
              </p>
              <p>
                Payment Method:{" "}
                <span className="text-level-5">Credit Card (**** 1234)</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
            >
              View Order
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-level-5 text-level-5 rounded-xl hover:bg-level-5 hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Email Notification */}
          <p className="mt-8 text-sm text-level-5/60">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
