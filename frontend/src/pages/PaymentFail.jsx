import React from "react";
import { XCircle, ArrowRight, RefreshCcw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-6 bg-red-50 rounded-full border-2 border-dashed border-red-500">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-level-5 mb-4">
            Payment Failed!
          </h1>
          <p className="text-level-5/70 mb-8 text-lg">
            We couldn't process your payment. Please try again or use a
            different payment method.
          </p>

          {/* Error Details Card */}
          <div className="bg-level-2/60 border-2 border-dashed border-level-4 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-level-5 mb-4">
              <AlertCircle className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Error Details</h2>
            </div>
            <div className="space-y-2 text-level-5/70">
              <p>
                Transaction ID: <span className="text-level-5">#123456789</span>
              </p>
              <p>
                Error Code:{" "}
                <span className="text-red-500">ERR_PAYMENT_DECLINED</span>
              </p>
              <p>
                Amount: <span className="text-level-5">৳20,000</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()} // Or your retry payment logic
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
            >
              Try Again
              <RefreshCcw className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-level-5 text-level-5 rounded-xl hover:bg-level-5 hover:text-white transition-colors"
            >
              Back to Cart
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-sm text-level-5/60">
            <p>
              If you continue to experience issues, please contact our support
              team.
            </p>
            <p className="mt-1">
              Support Email:{" "}
              <a
                href="mailto:support@digimart.com"
                className="text-level-5 hover:underline"
              >
                support@digimart.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
