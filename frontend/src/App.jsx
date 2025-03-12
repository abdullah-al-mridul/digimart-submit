import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import Sessions from "./pages/Sessions";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import authStore from "./store/authStore";
import SecureRoute from "./components/SecureRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import Controll from "./pages/Controll";
import { Toaster } from "react-hot-toast";
import EmailVerification from "./pages/EmailVerification";
const App = () => {
  const { user, getUser, loading } = authStore();
  console.log(user);
  useEffect(() => {
    getUser();
  }, [getUser]);
  if (loading) return <Loader />;
  return (
    <Router>
      <div className="bg-level-1 min-h-[100dvh] max-h-[100dvh] overflow-y-auto">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/cart"
            element={
              <SecureRoute>
                <Cart />
              </SecureRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <SecureRoute>
                <Wishlist />
              </SecureRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <SecureRoute>
                <Orders />
              </SecureRoute>
            }
          />
          <Route path="/category/:id" element={<Category />} />
          <Route
            path="/sessions"
            element={
              <SecureRoute>
                <Sessions />
              </SecureRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <SecureRoute>
                <Admin />
              </SecureRoute>
            }
          />
          <Route path="/admin/control" element={<Controll />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/payment/success"
            element={
              <SecureRoute>
                <PaymentSuccess />
              </SecureRoute>
            }
          />
          <Route
            path="/payment/fail"
            element={
              <SecureRoute>
                <PaymentFail />
              </SecureRoute>
            }
          />
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
        <Footer />
        <div>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                background: "#a294f9",
                color: "#907ffd",
                border: "2px dashed #a294f9",
                borderRadius: "12px",
                padding: "16px",
              },
              success: {
                style: {
                  background: "#e5d9f2",
                  border: "2px dashed #22c55e",
                },
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#f5efff",
                },
              },
              error: {
                style: {
                  background: "#e5d9f2",
                  border: "2px dashed #ef4444",
                },
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#f5efff",
                },
              },
              loading: {
                style: {
                  background: "#e5d9f2",
                  border: "2px dashed #a294f9",
                },
                iconTheme: {
                  primary: "#907ffd",
                  secondary: "#f5efff",
                },
              },
            }}
            position="bottom-left"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
              bottom: 40,
              left: 20,
              margin: "0px",
            }}
            toastClassName=""
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
