import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Error Icon */}
          <div className="p-6 bg-level-2/60 rounded-full border-2 border-dashed border-level-4 mb-6">
            <AlertCircle className="w-16 h-16 text-level-5" />
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-level-5 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-level-5 mb-2">
            Page Not Found
          </h2>
          <p className="text-level-5/70 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Back to Home Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
