import React from "react";
import { PasswordStrength, PasswordRequirement } from "@/types/password";
import { getPasswordRequirementsStatus } from "@/util/passwordValidation";

interface PasswordStrengthIndicatorProps {
  password: string;
  isVisible: boolean;
  onStrengthChange?: (strength: PasswordStrength) => void;
}

export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ password, isVisible, onStrengthChange }) => {
  const [strength, setStrength] = React.useState<PasswordStrength>({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    },
    isValid: false,
  });

  const [, setRequirements] = React.useState<PasswordRequirement[]>([]);

  React.useEffect(() => {
    const updatedRequirements = getPasswordRequirementsStatus(password);
    const metCount = updatedRequirements.filter((req) => req.isMet).length;
    const score = Math.round((metCount / updatedRequirements.length) * 100);

    const newStrength: PasswordStrength = {
      score,
      requirements: {
        length:
          updatedRequirements.find((r) => r.id === "length")?.isMet || false,
        uppercase:
          updatedRequirements.find((r) => r.id === "uppercase")?.isMet || false,
        lowercase:
          updatedRequirements.find((r) => r.id === "lowercase")?.isMet || false,
        number:
          updatedRequirements.find((r) => r.id === "number")?.isMet || false,
        specialChar:
          updatedRequirements.find((r) => r.id === "specialChar")?.isMet ||
          false,
      },
      isValid: metCount === updatedRequirements.length,
    };

    setStrength(newStrength);
    setRequirements(updatedRequirements);

    if (onStrengthChange) {
      onStrengthChange(newStrength);
    }
  }, [password]); // do not include onStrengthChange to avoid re-renders

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="w-full p-1 pt-0 transition-all duration-300 ease-in-out"
      role="region"
      aria-label="Password strength indicator"
    >
      {/* Segmented Progress Bar */}
      <div className="-mt-2">
        <div className="flex space-x-2 h-3">
          {[0, 1, 2, 3].map((index) => {
            const segmentThreshold = (index + 1) * 20;
            const isActive = strength.score >= segmentThreshold;

            return (
              <div
                key={index}
                className={`flex-1 h-1 border rounded-lg transition-all duration-500 ease-out transform ${
                  isActive
                    ? strength.score >= 80
                      ? "bg-gradient-to-r from-green-400 to-green-600 shadow-md scale-105"
                      : strength.score >= 50
                      ? "bg-gradient-to-r from-orange-400 to-orange-600 shadow-md scale-105"
                      : "bg-gradient-to-r from-red-400 to-red-600 shadow-md scale-105"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                role="progressbar"
                aria-valuenow={isActive ? segmentThreshold : 0}
                aria-valuemin={0}
                aria-valuemax={20}
                aria-label={`Segment ${index + 1} of 5`}
              />
            );
          })}
        </div>

        {/* Label */}
        <div className="flex justify-between items-center ">
          <span
            className={`text-xs font-medium transition-colors duration-300 ${
              strength.score >= 80
                ? "text-green-600"
                : strength.score >= 50
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {strength.score >= 80
              ? "Well done! You've set up a strong password."
              : strength.score >= 50
              ? "Medium"
              : "Weak"}
          </span>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @media (max-width: 640px) {
          .space-y-1 > div {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};
