// pages/auth.tsx
import { RightFrame } from "@/components/auth/RightFrame";
import { LeftFrame } from "@/components/auth/LeftFrame";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full border border-gray-300 bg-[#FFFFFF] p-7">
        <LeftFrame />
        <RightFrame />
      </div>
    </div>
  );
}
