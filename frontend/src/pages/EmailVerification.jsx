import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authStore from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const { user, verifyEmail, resendVerificationEmail } = authStore();
  const navigate = useNavigate();

  // Handle initial timer and redirect if already verified
  useEffect(() => {
    if (user?.isVerified) {
      navigate("/");
    }

    // Check if there's a saved timer in localStorage
    const savedTimer = localStorage.getItem("verificationTimer");
    const savedTimestamp = localStorage.getItem("verificationTimestamp");

    if (savedTimer && savedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(savedTimestamp)) / 1000
      );
      const remainingTime = Math.max(parseInt(savedTimer) - elapsed, 0);

      if (remainingTime > 0) {
        setResendTimer(remainingTime);
      } else {
        // Clear expired timer
        localStorage.removeItem("verificationTimer");
        localStorage.removeItem("verificationTimestamp");
      }
    }
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          // Clear timer from localStorage when it reaches 0
          localStorage.removeItem("verificationTimer");
          localStorage.removeItem("verificationTimestamp");
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle OTP input
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").concat(Array(4).fill("")).slice(0, 4);
      setOtp(newOtp);
    }
  };

  // Handle verification
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter a valid 4-digit code");
      return;
    }

    try {
      await verifyEmail(code);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle resend
  const handleResend = async () => {
    console.log("dff");
    try {
      await resendVerificationEmail();
      const timerDuration = 30;
      setResendTimer(timerDuration);

      // Save timer state to localStorage
      localStorage.setItem("verificationTimer", timerDuration.toString());
      localStorage.setItem("verificationTimestamp", Date.now().toString());
    } catch (error) {
      console.log(error);
    }
  };
  if (user?.isVerified) return <Navigate to={"/"} replace />;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-level-5">
            Verify Your Email
          </h2>
          <p className="text-level-5/70">
            We've sent a verification code to{" "}
            <span className="text-level-5 font-medium">{user?.email}</span>
          </p>

          {/* OTP Input */}
          <div className="flex justify-center gap-4 my-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-2xl text-level-5 text-center border-2 border-dashed border-level-4 rounded-xl bg-level-2/60 focus:border-level-5 focus:outline-none transition-colors"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleVerify}
              className="w-full cursor-pointer bg-level-5 text-white py-3 px-6 rounded-xl hover:bg-level-5/90 transition-colors"
            >
              Verify Email
            </button>

            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`w-full cursor-pointer border-2 border-dashed py-3 px-6 rounded-xl transition-colors ${
                resendTimer > 0
                  ? "border-level-4/50 text-level-5/50 cursor-not-allowed"
                  : "border-level-4 text-level-5 hover:border-level-5"
              }`}
            >
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
