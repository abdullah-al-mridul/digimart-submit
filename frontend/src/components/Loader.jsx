import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Brand Name with Shadow Effect */}
        <div className="relative mb-16">
          <h1 className="text-5xl font-bold tracking-widest text-level-5/10">
            DIGIMART
          </h1>
          <h1 className="absolute inset-0 text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-level-5 to-level-5/80">
            DIGIMART
          </h1>
        </div>

        {/* Loader Circle */}
        <div className="relative w-24 h-24">
          {/* Static outer circles */}
          <div className="absolute -inset-4 border-2 border-dashed border-level-4/20 rounded-full" />
          <div className="absolute -inset-8 border-2 border-dashed border-level-4/10 rounded-full" />

          {/* Rotating circles */}
          <div className="absolute inset-0 rounded-full border-4 border-level-4/30 border-dashed animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full border-4 border-level-4/20 border-dashed animate-[spin_5s_linear_infinite_reverse]" />
          <div className="absolute inset-2 rounded-full border-4 border-level-4 border-dashed animate-[spin_3s_linear_infinite]" />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-level-5/20 animate-ping" />
              <div className="w-3 h-3 rounded-full bg-level-5" />
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute h-full w-full animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-level-5 rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-level-5 rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-level-5 rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-level-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
