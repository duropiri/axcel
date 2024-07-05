"use client";
import React, { useRef, useEffect, CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfiniteTextOnScroll({
  children,
  className,
}: AnimationProps) {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (firstText.current && secondText.current) {
      const text = children as string;
      firstText.current.textContent = text;
      secondText.current.textContent = text;
    }
  }, [children]);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
    }
    xPercent += 0.1 * direction;
    requestAnimationFrame(animate);
  };

  return (
    <main className={styles.main}>
      <div style={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText} className={"relative " + styles.sliderP} />
          <p
            ref={secondText}
            className={"absolute top-0 " + styles.sliderP}
            style={{ left: "100%" }}
          />
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: "relative flex",
  sliderContainer: {
    position: "absolute" as CSSProperties["position"],
    // top: "calc(100vh - 350px)",
  } as CSSProperties,
  slider: "relative whitespace-nowrap",
  sliderP: "m-0 text-white text-[230px] font-medium pr-[50px]",
};
