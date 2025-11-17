import React from "react";
import Image from "next/image";

const ChatbotLucaBadge = () => {
  return (
    <div
      className="flex items-center gap-[3px] p-[6px]"
      style={{
        borderRadius: "1234px",
        background: "linear-gradient(53deg, #FF8C3F 27.79%, #864CEF 79.83%)",
      }}
    >
      {/* Subframe */}
      <div className="flex items-center gap-[7px]">
        {/* Subsubframe */}
        <div className="flex flex-row gap-[7px] justify-center items-center h-[29px]">
          {/* Inner circle with background */}
          <div className="flex justify-center items-center w-[29px] h-[29px] flex-shrink-0 rounded-full bg-[#CAD1FF]">
            <Image
              src="/icons/luca_face.png"
              alt="Luca"
              width={29}
              height={29}
              style={{
                flexShrink: 0,
                borderRadius: "23.974px",
                background:
                  "lightgray -4.623px -0.326px / 131.492% 131.492% no-repeat",
              }}
            />
          </div>
          <span className="text-white text-lg">Luca</span>
        </div>
      </div>

      {/* SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <path
          d="M12.2494 9.06388L6.93693 14.3764C6.78723 14.5261 6.58419 14.6102 6.37248 14.6102C6.16076 14.6102 5.95773 14.5261 5.80802 14.3764C5.65832 14.2267 5.57422 14.0236 5.57422 13.8119C5.57422 13.6002 5.65832 13.3972 5.80802 13.2475L10.5567 8.50009L5.80935 3.75138C5.73523 3.67726 5.67643 3.58926 5.63631 3.49241C5.59619 3.39556 5.57555 3.29176 5.57555 3.18693C5.57555 3.0821 5.59619 2.9783 5.63631 2.88145C5.67643 2.7846 5.73523 2.6966 5.80935 2.62248C5.88348 2.54835 5.97148 2.48955 6.06832 2.44944C6.16517 2.40932 6.26898 2.38867 6.3738 2.38867C6.47863 2.38867 6.58244 2.40932 6.67928 2.44944C6.77613 2.48955 6.86413 2.54835 6.93826 2.62248L12.2508 7.93498C12.325 8.0091 12.3838 8.09713 12.4239 8.19404C12.464 8.29095 12.4846 8.39482 12.4845 8.49971C12.4843 8.60459 12.4635 8.70841 12.4232 8.80522C12.3829 8.90204 12.3238 8.98994 12.2494 9.06388Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default ChatbotLucaBadge;
