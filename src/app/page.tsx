"use client";
import React, { useEffect, useState, useRef } from "react";
import Hero from "@/components/pages/home/Hero";
import { Projects } from "@/data/Projects";
import Preloader from "@/components/Preloader";
import { usePreloader } from "@/contexts/PreloaderContext";
import HomeSection from "@/components/pages/home/layout/HomeSection";
import IndexIndicator from "@/components/pages/home/IndexIndicator";
import ProjectSelector from "@/components/pages/home/ProjectSelector";
// import gsap from "gsap";

export default function Home() {
  const { isLoaded, finishLoading, finishAnimation } = usePreloader();
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 indicates no section is in view
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) {
      finishLoading();
    }
  }, [isLoaded, finishLoading]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let anyIntersecting = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1) {
            setCurrentIndex(index);
            anyIntersecting = true;
          }
        }
      });

      if (!anyIntersecting) {
        setCurrentIndex(-1);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between text-[#d8c8af] snap-y snap-mandatory overflow-y-scroll h-screen w-screen">
      <Preloader
        finishLoading={finishLoading}
        finishAnimation={finishAnimation}
      />
      <Hero
        className="scroll-snap-align snap-always snap-start min-h-screen"
        projects={Projects}
      />
      {/* {Projects.map((project, index) => (
        <HomeSection
          key={index}
          className="scroll-snap-align snap-normal snap-start min-h-screen"
          project={project}
          projects={Projects}
          index={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
        />
      ))} */}
      <IndexIndicator currentIndex={currentIndex} total={Projects.length} />
      <ProjectSelector
        navRefs={navRefs}
        navContainerRef={navContainerRef}
        currentIndex={currentIndex}
        projects={Projects}
        sectionRefs={sectionRefs}
      />
    </main>
  );
}
