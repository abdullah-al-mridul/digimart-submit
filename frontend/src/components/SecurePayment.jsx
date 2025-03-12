import React from "react";
import { Shield, Truck, Clock, BadgeCheck } from "lucide-react";

const SecurePayment = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% Protected Payment",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick Delivery Service",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated Support",
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: "Quality Products",
      description: "100% Genuine Products",
    },
  ];

  return (
    <div className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto py-6 border-2 border-dashed border-level-4 border-t-0 border-b-0 p-4">
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-level-4 rounded-xl p-4 flex flex-col items-center text-center group hover:border-level-5 transition-colors cursor-pointer"
            >
              <div className="text-level-5 mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-level-5 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-level-5/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurePayment;
