import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { getRememberMeSession } from "@/util/rememberMeSession";
import { SignIn } from "./SignIn";
import { signinFormValues, signupFormValues } from "@/types/auth.type";
import { SetupProfile } from "./SetupProfile";

interface IProps {
  isSignUp: boolean;
  isVisible: boolean;
  toggleVisibility: () => void;
  currentStep: "auth" | "setup";
  setCurrentStep: React.Dispatch<React.SetStateAction<"auth" | "setup">>;
}

export const AuthForm = ({
  isSignUp,
  isVisible,
  toggleVisibility,
  currentStep,
  setCurrentStep,
}: IProps) => {
  const router = useRouter();
  const [authError, setAuthError] = useState<string>("");
  const [signInData, setSignInData] = useState<signinFormValues | null>(null);

  // Form for Step 1 (Email & Password)
  const signinForm = useForm<signinFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // Form for Step 2 (Personal Information)
  const signupForm = useForm<signupFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // Effect to clear step 2 form when step changes
  useEffect(() => {
    if (currentStep === "setup") {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        signupForm.reset({
          name: "",
          company: "",
          jobTitle: "",
        });
      }, 0);
    }
  }, [currentStep, signupForm]);

  // Effect to check for existing remember me session on component mount
  useEffect(() => {
    if (!isSignUp) {
      const session = getRememberMeSession();
      if (session) {
        // Pre-fill email if remember me session exists
        signinForm.setValue("email", session.email);
        signinForm.setValue("rememberMe", true);

        // ✅ Proper console log with template literal
        console.log(
          `📧 Pre-filled email from remember me session (${Math.ceil(
            (session.expiresAt - Date.now()) / (24 * 60 * 60 * 1000)
          )} days remaining)`
        );
      }
    }
  }, [isSignUp, signinForm]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAuthError = (err: any) => {
    if (err.code === "auth/email-already-in-use") {
      setAuthError(
        "An account with this email already exists. Please try signing in instead."
      );
    } else if (err.code === "auth/invalid-email") {
      setAuthError("Please enter a valid email address.");
    } else if (err.code === "auth/weak-password") {
      setAuthError("Password should be at least 6 characters long.");
    } else if (err.code === "auth/user-not-found") {
      setAuthError(
        "No account found with this email. Please check your email or sign up."
      );
    } else if (err.code === "auth/wrong-password") {
      setAuthError("Incorrect password. Please try again.");
    } else {
      setAuthError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {currentStep === "auth" ? (
        <SignIn
          isSignUp={isSignUp}
          signinForm={signinForm}
          currentStep={currentStep}
          authError={authError}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
          setAuthError={setAuthError}
          handleAuthError={handleAuthError}
          setSignInData={setSignInData}
          setCurrentStep={setCurrentStep}
          router={router}
          signupForm={signupForm}
        />
      ) : (
        <SetupProfile
          authError={authError}
          signupForm={signupForm}
          signInData={signInData}
          setAuthError={setAuthError}
          router={router}
          handleAuthError={handleAuthError}
        />
      )}
    </div>
  );
};
