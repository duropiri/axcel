"use client";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface ScrollingBannerProps {
  children: React.ReactNode;
  baseVelocity?: number;
  length?: number;
  banner?: string;
  child?: string;
  innerChild?: string;
  slowOnHover?: boolean;
}

export default function ScrollingBanner({
  children,
  baseVelocity = 300,
  length = 180,
  banner,
  child,
  innerChild,
  slowOnHover = false,
}: ScrollingBannerProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  const [isHovered, setIsHovered] = useState(false);

  const adjustedBaseVelocity =
    slowOnHover && isHovered ? baseVelocity / 3 : baseVelocity;

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy =
      directionFactor.current * (adjustedBaseVelocity  / 1000) * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const styles = {
    banner:
      " relative m-0 flex flex-nowrap items-center overflow-hidden whitespace-nowrap",
    child: " flex flex-row flex-nowrap items-center whitespace-nowrap",
    innerChild: " mx-4",
  };

  return (
    <div
      className={banner + styles.banner}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          x,
        }}
        className={child + styles.child}
      >
        {Array.from({ length }).map((_, index) => (
          <span className={innerChild + styles.innerChild} key={index}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
