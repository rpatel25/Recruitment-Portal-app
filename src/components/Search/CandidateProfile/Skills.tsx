import { cn } from "@heroui/theme";
import React from "react";

export const Skills = ({ skills }: { skills: Array<string> }) => {
  return (
    <div>
      <h5 className="text-[#171717] text-sm font-medium mb-2">Skills:</h5>
      <div className="flex items-end gap-1">
        {skills.length > 0 ? (
          skills.slice(0, 8).map((skill, index) => (
            <div
              key={index}
              className={cn(
                "bg-[#E1DBF5] rounded-lg",
                "flex items-center justify-center",
                "py-1.5 px-3",
                "text-[#171717] text-sm"
              )}
            >
              {skill}
            </div>
          ))
        ) : (
          <h5 className="text-[#171717] text-sm font-medium">
            No skills found!
          </h5>
        )}
      </div>
    </div>
  );
};
