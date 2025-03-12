import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import authStore from "../store/authStore";
import cartStore from "../store/cartStore";

const Header = () => {
  const headerRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart, getCart, loading } = cartStore();
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };

    // Resize Observer to detect height changes
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    updateHeaderHeight(); // Initial height set

    return () => resizeObserver.disconnect(); // Cleanup observer
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { user, logout } = authStore();
  return (
    <div ref={headerRef} className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto px-4 border-l-2 border-r-2 border-dashed border-level-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-3xl font-extrabold text-level-5 cursor-pointer tracking-tight"
          >
            <span className="bg-gradient-to-r from-level-4 to-level-5 text-transparent bg-clip-text">
              DIGI
            </span>
            <span className="text-level-5">MART</span>
          </Link>
          <div>
            <ul className="flex items-center gap-6">
              {user?.isVerified && (
                <li>
                  <Link
                    to={"/cart"}
                    className="p-2 block hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <ShoppingCart className="w-6 h-6 text-level-4" />
                    <span className="absolute -top-1 -right-1 bg-level-5 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {loading && cart?.length < 1
                        ? "..."
                        : cart?.items?.length}
                    </span>
                  </Link>
                </li>
              )}
              <li>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 gap-0.5 cursor-pointer py-2 bg-level-5 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <User className="h-5" />
                    <span className=" hidden sm:block">Account</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-dashed border-level-4 rounded-xl shadow-lg py-2 z-50">
                      {user ? (
                        <>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                          >
                            Orders
                          </Link>
                          <Link
                            to="/wishlist"
                            className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                          >
                            Wishlist
                          </Link>
                          <Link
                            to="/sessions"
                            className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                          >
                            Login History
                          </Link>
                          {user.role === "admin" && (
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <div className="border-t border-dashed border-level-4 my-2" />
                          <button
                            onClick={() => {
                              logout();
                            }}
                            className="w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:bg-level-2/60 transition-colors flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-level-5 hover:bg-level-2/60 transition-colors"
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
