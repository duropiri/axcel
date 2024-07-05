"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ComponentProps {
  className?: string;
  finishLoading: () => void;
  logo: React.ReactElement;
}

export function LoadingBarVignette({
  className,
  finishLoading,
  logo
}: ComponentProps) {
  const circleRef = useRef(null);
  const logoRef = useRef(null);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    // Initial setup for the loading bar
    gsap.set(loadingBarRef.current, {
      scaleX: 0,
      transformOrigin: "left",
      autoAlpha: 1,
    });

    // Animate the pulsating of the logo, then shrinking of the circle and logo
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: finishLoading,
    });

    // Pulsate effect for the logo
    timeline
      .to(logoRef.current, {
        scale: 1.1, // Slightly larger scale for the pulsate effect
        duration: 0.4,
        ease: "power1.inOut",
      })
      .to(logoRef.current, {
        scale: 1, // Return to original scale
        duration: 0.4,
        ease: "power1.inOut",
      });

    // Loading bar animation to fill up concurrently with the logo pulsate
    timeline.to(
      loadingBarRef.current,
      {
        scaleX: 1,
        duration: 0.8,
        ease: "none",
      },
      "0"
    );

    // Fade out the loading bar before proceeding with the shrinking animations
    timeline.to(loadingBarRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });

    // After the loading bar fades out, proceed to shrink the logo and circle
    timeline
      .to(logoRef.current, {
        scale: 0,
        duration: 1.2,
        ease: "power2.in",
      })
      .to(
        circleRef.current,
        {
          scale: 0,
          duration: 1.2,
          ease: "power2.in",
          delay: -0.5, // Overlap with logo animation for a smooth transition
        },
        ">-0.5"
      );
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 overflow-hidden z-[99999] flex flex-col items-center justify-center bg-transparent cursor-wait">
      {/* The circle, styled to be large and circular immediately */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 bg-black"
        style={{
          borderRadius: "50%",
          width: "300vw",
          height: "300vw",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      {/* The logo, centered */}
      <div ref={logoRef} className="z-10 select-none pointer-events-none">
        {logo}
      </div>
      {/* Loading bar */}
      <div className="absolute bottom-10 w-full px-20">
        <div
          ref={loadingBarRef}
          className="h-1 w-full bg-white"
        ></div>
      </div>
    </div>
  );
}
