import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const RightFrame = () => {
  const slides = [
    {
      text: "Hire top talent in 30 seconds using automated screening and instant shortlists.",
      avatar: "/icons/Avtar_png.png",
    },
    {
      text: "Save hours of recruitment with AI-powered candidate matching.",
      avatar: "/icons/Avtar_png.png",
    },
    {
      text: "Build your dream team faster with instant shortlist recommendations.",
      avatar: "/icons/Avtar_png.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative max-w-[717px] w-full lg:w-1/2 text-white overflow-hidden rounded-2xl">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/icons/Right_BG.png"
          alt="Background"
          className="w-full h-full object-fill rounded-r-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top-right button */}
        <div className="flex justify-end p-4 sm:p-6">
          <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md transition font-outfit text-[16px] leading-[22px] tracking-[-0.007em]">
            Visit our website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="19"
              viewBox="0 0 23 19"
              fill="none"
              className="inline-block ml-2 w-5 h-5"
            >
              <path
                d="M22.1099 10.1411L13.9537 18.2973C13.7836 18.4674 13.553 18.5629 13.3125 18.5629C13.072 18.5629 12.8414 18.4674 12.6713 18.2973C12.5013 18.1273 12.4057 17.8966 12.4057 17.6561C12.4057 17.4157 12.5013 17.185 12.6713 17.015L19.2813 10.4061H1.53125C1.2909 10.4061 1.06039 10.3107 0.890435 10.1407C0.72048 9.97075 0.625 9.74025 0.625 9.49989C0.625 9.25954 0.72048 9.02903 0.890435 8.85908C1.06039 8.68912 1.2909 8.59364 1.53125 8.59364H19.2813L12.6713 1.98482C12.5013 1.81477 12.4057 1.58413 12.4057 1.34364C12.4057 1.10316 12.5013 0.872521 12.6713 0.702472C12.8414 0.532422 13.072 0.43689 13.3125 0.43689C13.553 0.43689 13.7836 0.532422 13.9537 0.702472L22.1099 8.85872C22.1942 8.94289 22.261 9.04284 22.3066 9.15285C22.3522 9.26287 22.3757 9.3808 22.3757 9.49989C22.3757 9.61899 22.3522 9.73692 22.3066 9.84693C22.261 9.95695 22.1942 10.0569 22.1099 10.1411Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        {/* Center content with animation */}
        <div className="relative z-11 flex flex-col h-full items-center justify-end px-12 pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl shadow-xl p-6 sm:p-10 max-w-2xl w-full text-center"
            >
              {/* Avatar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-lg border-4 border-white/40">
                  <img
                    src={slides[currentIndex].avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.2"
                    viewBox="0 0 46 55"
                    width={46}
                    height={55}
                    className="absolute -top-8 -right-6 w-12 h-14 text-white animate-pulse"
                  >
                    <defs>
                      <linearGradient
                        id="g1"
                        x2="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(0,13,-12.622,0,10,2)"
                      >
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#c1edff" />
                      </linearGradient>
                      <linearGradient
                        id="g2"
                        x2="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(0,13,-12.622,0,39,8)"
                      >
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#c1edff" />
                      </linearGradient>
                    </defs>
                    <g>
                      <path
                        className="s0"
                        d="m20.1 14.3c0.6-1.8 3.2-1.8 3.8 0l3.1 8.9c0.6 1.6 1.9 3 3.5 3.6l8.7 3.3c1.7 0.7 1.7 3.1 0 3.8l-8.7 3.3c-1.6 0.6-2.9 2-3.5 3.6l-3.1 8.9c-0.6 1.8-3.2 1.8-3.8 0l-3.1-8.9c-0.6-1.6-1.9-3-3.5-3.6l-8.7-3.3c-1.7-0.7-1.7-3.1 0-3.8l8.7-3.3c1.6-0.6 2.9-2 3.5-3.6z"
                        fill="#ffffff"
                      />
                    </g>
                    <g>
                      <path
                        className="s1"
                        d="m8.9 5.2c0.4-1 1.8-1 2.2 0 0.3 1 1.1 1.8 2 2.1l0.1 0.1c1 0.4 1 1.8 0 2.2l-0.1 0.1c-0.9 0.3-1.7 1.1-2 2.1-0.4 1-1.8 1-2.2 0-0.3-1-1.1-1.8-2-2.1l-0.1-0.1c-1-0.4-1-1.8 0-2.2l0.1-0.1c0.9-0.3 1.7-1.1 2-2.1z"
                        fill="url(#g1)"
                      />
                    </g>
                    <g>
                      <path
                        className="s2"
                        d="m37.9 11.2c0.4-1 1.8-1 2.2 0 0.3 1 1.1 1.8 2 2.1l0.1 0.1c1 0.4 1 1.8 0 2.2l-0.1 0.1c-0.9 0.3-1.7 1.1-2 2.1-0.4 1-1.8 1-2.2 0-0.3-1-1.1-1.8-2-2.1l-0.1-0.1c-1-0.4-1-1.8 0-2.2l0.1-0.1c0.9-0.3 1.7-1.1 2-2.1z"
                        fill="url(#g2)"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Text */}
              <p className="mt-10 text-lg sm:text-[40px] font-medium leading-relaxed text-white drop-shadow-sm">
                {slides[currentIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-6">
          {/* Left arrow */}
          <button
            onClick={prevSlide}
            className="text-white hover:text-gray-400 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="19"
              viewBox="0 0 23 19"
              fill="none"
            >
              <path
                d="M0.890079 8.85893L9.04633 0.702682C9.21638 0.532633 9.44702 0.4371 9.6875 0.4371C9.92799 0.4371 10.1586 0.532633 10.3287 0.702682C10.4987 0.872732 10.5943 1.10337 10.5943 1.34385C10.5943 1.58434 10.4987 1.81498 10.3287 1.98503L3.71871 8.59385L21.4688 8.59386C21.7091 8.59386 21.9396 8.68934 22.1096 8.85929C22.2795 9.02925 22.375 9.25975 22.375 9.50011C22.375 9.74046 22.2795 9.97097 22.1096 10.1409C21.9396 10.3109 21.7091 10.4064 21.4688 10.4064L3.71871 10.4064L10.3287 17.0152C10.4987 17.1852 10.5943 17.4159 10.5943 17.6564C10.5943 17.8968 10.4987 18.1275 10.3287 18.2975C10.1586 18.4676 9.92799 18.5631 9.6875 18.5631C9.44701 18.5631 9.21638 18.4676 9.04633 18.2975L0.890078 10.1413C0.805819 10.0571 0.738974 9.95716 0.693368 9.84714C0.647761 9.73713 0.624289 9.6192 0.624289 9.5001C0.624289 9.38101 0.647761 9.26308 0.693368 9.15306C0.738974 9.04305 0.805819 8.9431 0.890079 8.85893Z"
                fill="white"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={nextSlide}
            className="text-white hover:text-gray-400 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="19"
              viewBox="0 0 23 19"
              fill="none"
            >
              <path
                d="M22.1099 10.1411L13.9537 18.2973C13.7836 18.4674 13.553 18.5629 13.3125 18.5629C13.072 18.5629 12.8414 18.4674 12.6713 18.2973C12.5013 18.1273 12.4057 17.8966 12.4057 17.6561C12.4057 17.4157 12.5013 17.185 12.6713 17.015L19.2813 10.4061H1.53125C1.2909 10.4061 1.06039 10.3107 0.890435 10.1407C0.72048 9.97075 0.625 9.74025 0.625 9.49989C0.625 9.25954 0.72048 9.02903 0.890435 8.85908C1.06039 8.68912 1.2909 8.59364 1.53125 8.59364H19.2813L12.6713 1.98482C12.5013 1.81477 12.4057 1.58413 12.4057 1.34364C12.4057 1.10316 12.5013 0.872521 12.6713 0.702472C12.8414 0.532422 13.072 0.43689 13.3125 0.43689C13.553 0.43689 13.7836 0.532422 13.9537 0.702472L22.1099 8.85872C22.1942 8.94289 22.261 9.04284 22.3066 9.15285C22.3522 9.26287 22.3757 9.3808 22.3757 9.49989C22.3757 9.61899 22.3522 9.73692 22.3066 9.84693C22.261 9.95695 22.1942 10.0569 22.1099 10.1411Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
