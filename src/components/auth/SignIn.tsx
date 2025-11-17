/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { Button, cn, Input } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { UseFormReturn } from "react-hook-form";
import { signinFormValues, signupFormValues } from "@/types/auth.type";
import { PasswordStrength } from "@/types/password";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../util/firebaseClient";
import {
  setRememberMeSession,
  clearRememberMeSession,
} from "@/util/rememberMeSession";
import { NextRouter } from "next/router";
import { login } from "@/services/User";

interface SigninProps {
  authError: string;

  isSignUp: boolean;
  isVisible: boolean;
  handleAuthError: (err: any) => void;
  router: NextRouter;
  setAuthError: React.Dispatch<React.SetStateAction<string>>;
  setSignInData: React.Dispatch<React.SetStateAction<signinFormValues | null>>;

  signinForm: UseFormReturn<signinFormValues, any, signinFormValues>;
  signupForm: UseFormReturn<signupFormValues, any, signupFormValues>;
  toggleVisibility: () => void;
  currentStep: "auth" | "setup";
  setCurrentStep: React.Dispatch<React.SetStateAction<"auth" | "setup">>;
}

export const SignIn = ({
  isSignUp,
  signinForm,
  currentStep,
  authError,
  isVisible,
  toggleVisibility,
  setAuthError,
  handleAuthError,
  setSignInData,
  setCurrentStep,
  router,
  signupForm,
}: SigninProps) => {
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const watchedPassword = signinForm.watch("password", "");
  const watchedConfirmPassword = signinForm.watch("confirmPassword", "");

  const handlePasswordStrengthChange = useCallback(
    (strength: PasswordStrength) => {
      setPasswordStrength(strength);
    },
    []
  );

  const passwordsMatch =
    !isSignUp ||
    !watchedConfirmPassword ||
    watchedPassword === watchedConfirmPassword;

  const isSignInDisabled = Boolean(
    isSignUp &&
      currentStep === "auth" &&
      ((passwordStrength && !passwordStrength.isValid) ||
        !passwordsMatch ||
        (watchedConfirmPassword && watchedPassword !== watchedConfirmPassword))
  );

  const onSignIn = async (data: signinFormValues) => {
    const { email, password, rememberMe } = data;

    // Clear any previous errors
    setAuthError("");

    // For signup, check if password meets requirements
    if (isSignUp && passwordStrength && !passwordStrength.isValid) {
      setAuthError(
        "Please ensure your password meets all security requirements."
      );
      return;
    }

    if (isSignUp) {
      // Store step 1 data and move to step 2
      setSignInData(data);
      setCurrentStep("setup");
      // Reset step 2 form with empty values
      signupForm.reset({
        name: "",
        company: "",
        jobTitle: "",
      });
    } else {
      // For sign in, complete the process
      try {
        // Set Firebase persistence based on remember me checkbox
        const persistence = rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence;
        await setPersistence(auth, persistence);
        // console.log( Firebase persistence set to: ${rememberMe ? 'local (30 days)' : 'session'});

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("✅ User signed in:", user);

        // Handle remember me functionality
        if (rememberMe) {
          setRememberMeSession(email);
          console.log("🔐 Remember me session created for 30 days");
        } else {
          // Clear any existing remember me session if user unchecked the box
          clearRememberMeSession();
        }

        await login(await user.getIdToken());
        router.push("/");
      } catch (err: any) {
        console.error("❌ Firebase Auth Error:", err.message);
        handleAuthError(err);
      }
    }
  };

  return (
    <form onSubmit={signinForm.handleSubmit(onSignIn)}>
      <div className="flex flex-col items-start gap-2 w-full mb-4">
        {isSignUp ? (
          <div className="mb-5">
            <h1 className="font-medium text-[40px] text-[#323130]">Sign Up</h1>
            <p className="text-base text-[#323130]">
              Create an account and verify your details to start looking out for
              candidates.
            </p>
          </div>
        ) : (
          <div className="mb-5">
            <h1 className="font-medium text-[40px] text-[#323130]">
              Welcome back,
            </h1>
            <p className="text-base text-[#323130]">
              Enter your credentials to access your account
            </p>{" "}
          </div>
        )}

        <div className="w-full">
          <label className="font-medium text-base text-[#323130]">
            Email address
          </label>

          <Input
            size="sm"
            type="email"
            required
            variant="flat"
            placeholder="Enter your email address"
            {...signinForm.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className={cn(
              "rounded-lg border-2 my-3",
              "!outline-none",
              signinForm.formState.errors.email
                ? "border-red-300"
                : "border-[#3b4cbf4d]"
            )}
            classNames={{
              base: "min-h-[40px]",
              label: "text-white",
              inputWrapper: cn(
                "px-4 h-8 min-h-[40px] shadow-none border-none rounded-[20px]",
                "transition-colors duration-200"
              ),
              input:
                "text-[16px] text-[#232323] font-medium focus:outline-none",
            }}
            startContent={<Mail className="w-4 h-4 text-gray-400 mr-2" />}
          />
          {signinForm.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {signinForm.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <div className="relative">
            <label className="font-medium text-base text-[#323130]">
              Password
            </label>
            <Input
              size="sm"
              type={isVisible ? "text" : "password"}
              required
              variant="bordered"
              placeholder="Enter your password"
              {...signinForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={cn(
                "rounded-lg border-2 my-3",
                signinForm.formState.errors.password
                  ? "border-red-300"
                  : isSignUp &&
                    passwordStrength &&
                    !passwordStrength.isValid &&
                    watchedPassword.length > 0
                  ? "border-red-300"
                  : isSignUp && passwordStrength?.isValid
                  ? "border-green-300"
                  : "border-[#3b4cbf4d]"
              )}
              onFocus={() => isSignUp && setShowPasswordRequirements(true)}
              onBlur={() => {
                if (isSignUp && passwordStrength?.isValid) {
                  setShowPasswordRequirements(false);
                }
              }}
              startContent={
                <Lock className="w-4 h-4 text-gray-400 mr-2" /> // 👈 Password (Lock) Icon
              }
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onPointerDown={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="w-5 h-5 text-black opacity-70 pointer-events-none" />
                  ) : (
                    <Eye className="w-5 h-5 text-black opacity-70 pointer-events-none" />
                  )}
                </button>
              }
              classNames={{
                base: "min-h-[40px]",
                label: "text-white",
                inputWrapper: cn(
                  "px-4 h-8 min-h-[40px] shadow-none border-none rounded-[20px]",
                  "!outline-none",
                  "transition-colors duration-200"
                ),
                input:
                  "text-[16px] text-[#232323] font-medium focus:outline-none",
              }}
            />
          </div>

          {signinForm.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {signinForm.formState.errors.password.message}
            </p>
          )}
        </div>

        {isSignUp && (
          <PasswordStrengthIndicator
            password={watchedPassword}
            isVisible={
              showPasswordRequirements ||
              (watchedPassword.length > 0 && !passwordStrength?.isValid)
            }
            onStrengthChange={handlePasswordStrengthChange}
          />
        )}

        {!isSignUp && (
          <div className="w-full flex items-center mt-2 justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                {...signinForm.register("rememberMe")}
                className="hidden peer"
              />

              {/* Custom checkbox */}
              <div className="w-5 h-5 flex items-center justify-center rounded-lg border border-[#3B4CBF] bg-white peer-checked:bg-[#3B4CBF] peer-checked:border-[#3B4CBF] peer-checked:[&>svg]:block">
                {/* Checkmark */}
                <svg
                  className="hidden w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="text-sm font-medium text-[#323130]">
                Remember For 30 Days
              </span>
            </label>
            <span className="font-semibold text-sm text-[#3B4CBF]">
              <a href="#">Forgot Password?</a>
            </span>
          </div>
        )}
      </div>

      {authError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {authError}
        </div>
      )}

      <Button
        color="primary"
        type="submit"
        disabled={isSignInDisabled}
        className={cn(
          "w-full h-10 flex justify-center items-center gap-2 rounded-lg",
          "text-white text-center text-base font-medium",
          "shadow-[0_0_0.31vw_0_rgba(0,0,0,0.20)]",
          "transition-all duration-300 hover:opacity-90",
          isSignInDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
        )}
        endContent={<img src="/icons/signout_white.svg" />}
      >
        {isSignUp ? "Let’s Go" : "Sign In"}
      </Button>
    </form>
  );
};
