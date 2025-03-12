import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import slider1 from "/Screenshot_1.png";
import slider2 from "/Screenshot_2.png";
import slider3 from "/Screenshot_3.png";
const Slider = () => {
  return (
    <div className=" border-level-4 border-dashed border-b-2">
      <div className=" container mx-auto border-l-2 border-r-2 border-dashed border-level-4 py-4 px-4">
        <Swiper
          modules={[Autoplay, Scrollbar, Pagination]}
          spaceBetween={50}
          loop
          autoplay
          scrollbar={{ draggable: true }}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img
              style={{
                filter: "hue-rotate(-100deg)",
              }}
              className=" rounded-lg"
              src={slider1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{
                filter: "hue-rotate(-100deg)",
              }}
              className=" rounded-lg"
              src={slider2}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{
                filter: "hue-rotate(-100deg)",
              }}
              className=" rounded-lg"
              src={slider3}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
