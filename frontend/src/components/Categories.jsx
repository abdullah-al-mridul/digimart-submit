import { MoveRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import store from "../store/store";
import { Link } from "react-router-dom";

const CategoriesSkeleton = () => {
  return (
    <div className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto border-2 border-dashed border-level-4 border-t-0 border-b-0 p-4">
        <div className="flex gap-5 items-center mb-4">
          <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7"></div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="h-5 w-32 bg-level-3/50 animate-pulse rounded-lg mb-2"></div>
              <div className="flex gap-2">
                <div className="h-8 w-10 bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-8 w-2 bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-8 w-10 bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-8 w-2 bg-level-3/50 animate-pulse rounded-lg"></div>
                <div className="h-8 w-10 bg-level-3/50 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-level-3 rounded-xl p-6 cursor-pointer"
            >
              <div className="flex flex-col h-35 justify-between">
                <div className="h-8 w-32 bg-level-4/50 animate-pulse rounded-lg mb-4"></div>
                <div className="flex gap-5 justify-between items-center">
                  <div className="h-10 w-10 bg-level-4/50 animate-pulse rounded-2xl"></div>
                  <div className="w-20 h-20 bg-level-4/50 animate-pulse rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const { categoriesLoading, categories, getCategories } = store();
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes =
          newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        if (newHours < 0) {
          // Timer has ended
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  if (categoriesLoading) return <CategoriesSkeleton />;
  return (
    <div className=" border-b-2 border-dashed border-level-4">
      <div className=" container mx-auto border-2 border-dashed border-level-4 border-t-0 border-b-0  p-4">
        <div className="flex flex-col items-start sm:flex-row sm:gap-5 sm:items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7">
            Categories
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-level-5 text-sm">Flash Sale Ends In</span>
              <div className="flex gap-2">
                <span className="bg-level-4 text-white px-2 py-1 rounded">
                  <NumberFlow value={timeLeft.hours} />
                </span>
                <span className="text-level-5">:</span>
                <span className="bg-level-4 text-white px-2 py-1 rounded">
                  <NumberFlow value={timeLeft.minutes} />
                </span>
                <span className="text-level-5">:</span>
                <span className="bg-level-4 text-white px-2 py-1 rounded">
                  <NumberFlow value={timeLeft.seconds} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full  gap-4">
          {categories.map((item) => (
            <Link
              to={`/category/${item._id}`}
              key={item._id}
              className="bg-level-3 group hover:translate-y-[-5px] transition-transform rounded-xl p-6 cursor-pointer "
            >
              <div className="flex flex-col h-35 justify-between ">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {item.name}
                </h2>
                <div className="flex gap-5 justify-between items-center">
                  <div className=" h-full rounded-2xl flex-1 bg-level-4 flex items-center justify-center">
                    <MoveRight className="w-10 h-10 text-white group-hover:-rotate-45 transition-all" />
                  </div>
                  <img
                    src={`${item.image}`}
                    alt={item.title}
                    className="w-20 h-20 rounded-2xl flex-1 object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
