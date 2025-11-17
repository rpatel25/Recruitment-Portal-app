import { classNames } from "@/util/classNames";
import { cn } from "@heroui/theme";
import { useEffect, useRef } from "react";

const LoadingScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically and at 50% speed
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set playback rate to 50%
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <div className={cn(classNames.flexCenter, "inset-0 flex-col text-black bg-transparent")}>
      <div className="w-full max-w-md mx-auto mb-4">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/icons/Lookout Ai Product UI video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text-xl font-medium mt-2">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
