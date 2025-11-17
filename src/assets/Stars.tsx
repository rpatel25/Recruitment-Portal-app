import React from "react";

export const Stars = () => {
  return (
    <div
      style={{
        width: "8.7vw",
        height: "28vh",
        flexShrink: 0,
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "12.7%",
        right: "8.5%",
      }}
    >
      <img
        src="/icons/star/Star 18.svg"
        alt="Star 1"
        style={{
          position: "absolute",
          bottom: "0", // Aligns the image to the bottom of the div
          left: "35%",
          transform: "translate(-35%,35%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 19.svg"
        alt="Star 2"
        style={{
          position: "absolute",
          bottom: "51%", // Aligns the image to the bottom of the div
          right: "0%",
          transform: "translate(40%,51%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 4.svg"
        alt="Star 3"
        style={{
          position: "absolute",
          top: "12.5%", // Aligns the image to the bottom of the div
          left: "0%",
          transform: "translate(-40%,-40%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 5.svg"
        alt="Star 4"
        style={{
          position: "absolute",
          top: "0%", // Aligns the image to the bottom of the div
          left: "16%",
          transform: "translate(-40%,-40%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 9.svg"
        alt="Star 5"
        style={{
          position: "absolute",
          top: "34%", // Aligns the image to the bottom of the div
          left: "43%",
          transform: "translate(-35%,-35%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 10.svg"
        alt="Star 6"
        style={{
          position: "absolute",
          bottom: "16.4%", // Aligns the image to the bottom of the div
          left: "28%",
          transform: "translate(-50%,40%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
      <img
        src="/icons/star/Star 20.svg"
        alt="Star 7"
        style={{
          position: "absolute",
          top: "37%", // Aligns the image to the bottom of the div
          left: "11%",
          transform: "translate(-40%,-30%)", // Centers the image horizontally
          flexShrink: 0,
          fill: "var(--Schemes-Inverse-Primary, #D0BCFF)",
          filter: "drop-shadow(0px 0px 50px rgba(253, 209, 122, 0.30))",
        }}
      />
    </div>
  );
};
