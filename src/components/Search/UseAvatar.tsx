import React from "react";
import { cn } from "@heroui/theme";

interface User {
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
}

interface UserAvatarProps {
  user: User;
  size?: number; // Optional size override
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 48 }) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  if (!user.profilePhoto) {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          "rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: size * 0.4,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={user.profilePhoto}
      alt={user.firstName}
      className="rounded-xl object-cover"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default UserAvatar;
