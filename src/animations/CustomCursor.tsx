"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null); // Define type for cursorRef
  const followerTextRef = useRef<HTMLSpanElement | null>(null); // Define type for followerTextRef

  useEffect(() => {
    // Initialize cursor hidden and centered
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    }

    // Smoothly follow the mouse
    const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      }),
      yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.5,
        ease: "power3.out",
      });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX + 60);
      yTo(e.clientY + 50);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { autoAlpha: 0 });
      }
    }); // Hide cursor on mouse leave

    // Hover over elements that change the cursor (scale)
    document.querySelectorAll<HTMLElement>(".followerchangetest").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const text = el.getAttribute("data-follower-text") || ""; // Fallback text
        const scale = el.getAttribute("data-scale") || "1.5"; // Default scale or custom
        if (followerTextRef.current) {
          followerTextRef.current.innerHTML = text; // Set text
        }
        gsap.to(cursorRef.current, {
          scale: parseFloat(scale), // Use the custom scale
          ease: "power3.out",
          autoAlpha: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      });

      el.addEventListener("mouseleave", () => {
        if (followerTextRef.current) {
          followerTextRef.current.innerHTML = ""; // Clear text
        }
        gsap.to(cursorRef.current, {
          scale: 1, // Revert to original size
          ease: "power3.out",
          autoAlpha: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      });
    });

    // Hover over elements that change the cursor shape (text fields)
    document.querySelectorAll<HTMLElement>(".text-field-hover").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursorRef.current, {
          width: "5px", // Width of the rectangle
          height: "36px", // Height of the rectangle
          borderRadius: "3px", // Adjust for slightly rounded corners
          ease: "power3.out",
          autoAlpha: 0.5,
          duration: 0.2,
          overwrite: "auto",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(cursorRef.current, {
          width: "24px", // Original width of the cursor
          height: "24px", // Original height of the cursor
          borderRadius: "50%", // Back to circle shape
          ease: "power3.out",
          autoAlpha: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none flex items-center justify-center text-white mix-blend-difference"
      style={{ zIndex: 999 }}
    >
      <span
        ref={followerTextRef}
        className="text-sm font-semibold text-white uppercase"
      ></span>{" "}
      {/* Dynamic text */}
    </div>
  );
}
