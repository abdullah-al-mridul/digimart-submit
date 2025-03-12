import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import TopProducts from "../components/TopProducts";
import SecurePayment from "../components/SecurePayment";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <TopProducts />
      <SecurePayment />
    </>
  );
};

export default Home;
