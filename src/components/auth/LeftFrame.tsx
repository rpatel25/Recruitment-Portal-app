import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import { cn } from "@heroui/theme";

export const LeftFrame = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState<"auth" | "setup">("auth");

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className={cn(
        "w-full lg:w-1/2 bg-white",
        "flex flex-col justify-center items-center flex-shrink-0 gap-10",
        "px-6 sm:px-10 lg:px-[4vw] py-10"
      )}
    >
      {/* Logo */}
      <div className="absolute top-6 left-6 lg:top-[1.7vw] lg:left-[1.7vw]">
        <img
          className="w-32 sm:w-40 lg:w-[12vw] flex-shrink-0"
          src="icons/lookout.png"
          alt="SVG Icon"
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "w-full max-w-[29rem] h-full",
          "flex-shrink-0 bg-white flex flex-col justify-center items-center gap-6"
        )}
      >
        <div className="flex flex-col justify-center items-center gap-[0.73vw] w-full max-w-[29rem]">
          <AuthForm
            isSignUp={isSignUp}
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          {/* Divider */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[0.5] stroke-[#C0C0C0] w-full"
            viewBox="0 0 210 2"
            fill="none"
          >
            <path d="M0 1H210" stroke="currentColor" />
          </svg>

          {/* Footer */}
          {currentStep === "auth" ? (
            <div className="flex items-center justify-center w-full">
              <h5 className="text-[#706F6E] text-sm font-medium">
                {isSignUp
                  ? "Already have an account?"
                  : "Don’t have an account?"}{" "}
                <span
                  className="text-[#3B4CBF] font-semibold hover:cursor-pointer"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </h5>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
