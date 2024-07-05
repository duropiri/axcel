"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

interface AnimationProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: AnimationProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 5 }}>
      {children}
    </ReactLenis>
  );
}