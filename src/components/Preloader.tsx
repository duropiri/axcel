"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { usePreloader } from "@/contexts/PreloaderContext";

interface PreloaderProps {
  finishLoading: () => void;
  finishAnimation: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({
  finishLoading,
  finishAnimation,
}) => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const { isAnimating } = usePreloader();

  useEffect(() => {
    const updateLoadingPercentage = (percentage: number) => {
      setLoadingPercentage(percentage);
      // console.log(`Loading percentage updated to: ${percentage}`);
    };

    const handleWindowLoad = () => {
      // console.log("Window loaded, updating loading percentage to 100");
      updateLoadingPercentage(100);
      finishLoading();
    };

    // Check if the window is already loaded
    if (document.readyState === "complete") {
      // console.log("Document ready state is complete, handling window load immediately");
      handleWindowLoad();
    } else {
      // console.log("Adding load event listener");
      window.addEventListener("load", handleWindowLoad);
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev < 99) {
          // console.log(`Incrementing loading percentage to: ${prev + 1}`);
          return prev + 1; // Increase percentage up to 99%
        }
        return prev;
      });
    }, 20); // Increase percentage every 20ms

    return () => {
      // console.log("Cleaning up load event listener and interval");
      window.removeEventListener("load", handleWindowLoad);
      clearInterval(interval);
    };
  }, [finishLoading]);

  useEffect(() => {
    if (loadingPercentage === 100) {
      // console.log("Loading complete, starting exit animation");
      const timer = setTimeout(() => {
        // console.log("Exit animation complete, finishing animation");
        finishAnimation();
      }, 1200); // Delay to match animation duration

      return () => clearTimeout(timer); // Clean up timer if component unmounts
    }
  }, [loadingPercentage, finishAnimation]);

  useEffect(() => {
    if (loadingPercentage === 100) {
      gsap.to(".splash-screen", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          setTimeout(() => {
            finishAnimation();
          }, 1200);
        },
      });
    } else {
      gsap.to(".splash-screen", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
      });
    }
  }, [loadingPercentage, finishAnimation]);

  useEffect(() => {
    gsap.fromTo(
      ".splash-content",
      { scale: 1 },
      {
        keyframes: {
          scale: [1, 1.1, 1],
        },
        duration: 0.8,
        ease: "power4.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
  }, []);

  if (!isAnimating) {
    // console.log("Splash screen animation complete, removing splash screen");
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden z-[99999] flex flex-col items-center justify-center h-[100vh] bg-black cursor-wait splash-screen text-[#d8c8af]">
      <div className="z-10 select-none pointer-events-none flex flex-col splash-content">
        <div className="relative text-6xl sm:text-9xl uppercase font-extrabold mix-blend-difference">
          Axcel
          <span className="text-sm sm:text-2xl">Raul</span>
          <span className="text-lg sm:text-3xl font-light">®</span>
        </div>
        <div className="flex flex-row w-full items-center justify-between text-lg mix-blend-difference uppercase">
          <div>Loading</div>
          <div>[{loadingPercentage}%]</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
