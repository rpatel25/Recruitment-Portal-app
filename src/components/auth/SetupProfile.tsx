/* eslint-disable @typescript-eslint/no-explicit-any */
import { signinFormValues, signupFormValues } from "@/types/auth.type";
import { Button, cn, Input } from "@heroui/react";
import { NextRouter } from "next/router";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../util/firebaseClient";
import { setUserAccessToken } from "@/util/authToken";
import { registerUser } from "@/services/User";

interface SetupProfileProps {
  authError: string;
  signupForm: UseFormReturn<signupFormValues, any, signupFormValues>;
  signInData: signinFormValues | null;
  setAuthError: React.Dispatch<React.SetStateAction<string>>;
  handleAuthError: (err: any) => void;
  router: NextRouter;
}

export const SetupProfile = ({
  authError,
  signupForm,
  signInData,
  setAuthError,
  handleAuthError,
  router,
}: SetupProfileProps) => {
  const onSubmit = async (data: signupFormValues) => {
    if (!signInData) return;

    const { company, jobTitle, name } = data;
    const { email, password } = signInData;

    // Clear any previous errors
    setAuthError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const accessToken = await user.getIdToken();
      setUserAccessToken(accessToken);
      await registerUser(accessToken, {
        name: name,
        company: company,
        job_title: jobTitle,
      });
      console.log("✅ User registered:", user);
      console.log("✅ User signed up:", user);
      router.push("/");
    } catch (err: any) {
      console.error("❌ Firebase Auth Error:", err.message);
      handleAuthError(err);
    }
  };

  return (
    <form
      key="setupForm"
      onSubmit={signupForm.handleSubmit(onSubmit)}
      autoComplete="new-password"
    >
      <div className="flex flex-col items-start gap-2 w-full mb-4">
        <div className="w-full">
          <div className="mb-5">
            <h1 className="font-medium text-[40px] text-[#323130]">
              Set up your profile
            </h1>
            <p className="text-base text-[#323130]">
              Help us get to know you better!
            </p>
          </div>

          <label className="font-medium text-base text-[#323130]">
            Full name
          </label>
          <Input
            key="name-input"
            size="sm"
            type="text"
            required
            variant="bordered"
            placeholder="Enter your Name"
            autoComplete="given-name"
            defaultValue=""
            {...signupForm.register("name", {
              required: "Name is required",
            })}
            className={cn(
              "rounded-lg border-2 my-3",
              signupForm.formState.errors.name
                ? "border-red-300"
                : "border-[#3b4cbf4d]"
            )}
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
          {signupForm.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {signupForm.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="font-outfit font-medium text-[16px] leading-[20px] tracking-[-0.006em] text-[#323130]">
            Enter your company name
          </label>
          <Input
            key="company-input"
            size="sm"
            type="text"
            required
            variant="bordered"
            placeholder="Enter your Company"
            autoComplete="organization"
            defaultValue=""
            {...signupForm.register("company", {
              required: "Company is required",
            })}
            className={cn(
              "rounded-lg border-2 my-3",
              signupForm.formState.errors.company
                ? "border-red-300"
                : "border-[#3b4cbf4d]"
            )}
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
          {signupForm.formState.errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {signupForm.formState.errors.company.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="font-outfit font-medium text-[16px] leading-[20px] tracking-[-0.006em] text-[#323130]">
            What is your role?
          </label>
          <Input
            key="job-title-input"
            size="sm"
            type="text"
            required
            variant="bordered"
            placeholder="Enter your Job Title"
            autoComplete="organization-title"
            defaultValue=""
            {...signupForm.register("jobTitle", {
              required: "Job Title is required",
            })}
            className={cn(
              "rounded-lg border-2 my-3",
              signupForm.formState.errors.jobTitle
                ? "border-red-300"
                : "border-[#3b4cbf4d]"
            )}
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
          {signupForm.formState.errors.jobTitle && (
            <p className="text-red-500 text-sm mt-1">
              {signupForm.formState.errors.jobTitle.message}
            </p>
          )}
        </div>
      </div>

      {/* Display authentication errors */}
      {authError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {authError}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          color="primary"
          type="submit"
          className={cn(
            "flex-1 h-10",
            "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500",
            "flex justify-center items-center",
            "text-white text-center text-base font-medium",
            "rounded-lg shadow-[0_0_0.31vw_0_rgba(0,0,0,0.20)]",
            "transition-colors duration-200"
          )}
          endContent={<img src="/icons/signout_white.svg" />}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
