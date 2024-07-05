"use client";
import React, { useEffect, useState, useRef } from "react";
import Hero from "@/components/pages/home/Hero";
import { Projects } from "@/data/Projects";
import Preloader from "@/components/Preloader";
import { usePreloader } from "@/contexts/PreloaderContext";
import HomeSection from "@/components/pages/home/layout/HomeSection";
import gsap from "gsap";

export default function Home() {
  const { isLoaded, finishLoading, isAnimating, finishAnimation } =
    usePreloader();
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
            console.log(`Project ${index + 1} is in view`);
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

  useEffect(() => {
    const handleNavClick = (index: number) => {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    navRefs.current.forEach((nav, index) => {
      if (nav) {
        nav.addEventListener("click", () => handleNavClick(index));
        nav.addEventListener("mouseenter", () => {
          gsap.to(nav.querySelector(".thumbImg"), {
            opacity: 1,
            duration: 0.5,
          });
        });
        nav.addEventListener("mouseleave", () => {
          gsap.to(nav.querySelector(".thumbImg"), {
            opacity: 0.5,
            duration: 0.5,
          });
        });
      }
    });

    const handleMouseEnter = () => {
      if (navContainerRef.current) {
        gsap.set(navContainerRef.current, {
          height: "75vh",
          width: "5rem",
          duration: 0,
        });
        navContainerRef.current.classList.remove("closed");
      }
      navRefs.current.forEach((nav) => nav?.classList.remove("closed"));
      gsap.to(".sc-nav-content-block", { opacity: 0 });
    };

    const handleMouseLeave = () => {
      if (navContainerRef.current) {
        navContainerRef.current.classList.add("closed");
        setTimeout(() => {
          gsap.to(navContainerRef.current, {
            height: "1.5rem",
            width: "1.5rem",
            duration: 0.2,
          });
        }, 700);
        setTimeout(() => {
          if (navContainerRef.current)
            navContainerRef.current.classList.add("closed");
        }, 1000);
        gsap.to(".sc-nav-content-block", { opacity: 1 });
      }
      navRefs.current.forEach((nav) => nav?.classList.add("closed"));
    };

    const scNav = document.querySelector(".sc-nav");
    scNav?.addEventListener("mouseenter", handleMouseEnter);
    scNav?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scNav?.removeEventListener("mouseenter", handleMouseEnter);
      scNav?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between text-[#d8c8af] snap-y snap-mandatory overflow-y-scroll h-screen w-screen">
      {/* Preloader/Splash Screen */}
      <Preloader
        finishLoading={finishLoading}
        finishAnimation={finishAnimation}
      />
      {/* Hero Section */}
      <Hero
        className="scroll-snap-align snap-always snap-start min-h-screen"
        projects={Projects}
      />
      {/* Projects Sections */}
      {Projects.map((project, index) => (
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
      ))}
      {/* Index Indicator */}
      <div
        className="w-full pt-[5.5rem] fixed top-0 bottom-auto left-auto right-0 font-bold"
        style={{
          opacity: currentIndex === -1 ? 0 : 1,
          transition: "opacity 0.5s",
        }}
      >
        <div className="flex justify-end mr-[2.5vw] font-benzin text-[1.25rem]">
          <div className="relative h-[2ch] w-[2ch] items-end grid overflow-hidden">
            {Projects.map((_, index) => (
              <div
                key={index}
                h-index=""
                id={`w-node-b6c5c2b0-cf6f-792c-4f54-594384552a7${index + 9}`}
                className="index-num justify-end absolute -mb-[0.15rem]"
                style={{
                  transform: `translate(0px, ${
                    index === currentIndex
                      ? "0%"
                      : `${index > currentIndex ? "110%" : "-110%"}`
                  })`,
                  transition: "transform 0.5s",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div>/</div>
          <div>{String(Projects.length).padStart(2, "0")}</div>
        </div>
      </div>
      {/* Project Selector */}
      <aside
        className="sc-nav closed z-10 justify-center items-center duration-1000 transition-all flex fixed bottom-[1rem] left-[1rem]"
        style={{
          opacity: currentIndex === -1 ? 0 : 1,
          transition: "opacity 0.5s",
        }}
      >
        <div className="absolute w-[4px] h-[4px] items-center justify-center flex top-0 left-0">
          <div className="absolute w-[4px] h-[1px] bg-[#d8c8af]" />
          <div className="absolute w-[1px] h-[4px] bg-[#d8c8af]" />
        </div>
        <div className="absolute w-[4px] h-[4px] items-center justify-center flex top-0 right-0">
          <div className="absolute w-[4px] h-[1px] bg-[#d8c8af]" />
          <div className="absolute w-[1px] h-[4px] bg-[#d8c8af]" />
        </div>
        <div className="absolute w-[4px] h-[4px] items-center justify-center flex bottom-0 left-0">
          <div className="absolute w-[4px] h-[1px] bg-[#d8c8af]" />
          <div className="absolute w-[1px] h-[4px] bg-[#d8c8af]" />
        </div>
        <div className="absolute w-[4px] h-[4px] items-center justify-center flex bottom-0 right-0">
          <div className="absolute w-[4px] h-[1px] bg-[#d8c8af]" />
          <div className="absolute w-[1px] h-[4px] bg-[#d8c8af]" />
        </div>
        <div
          ref={navContainerRef}
          className="sc-nav-container closed gap-y-[0.25rem] flex flex-col justify-center items-center mt-[1rem] mb-[1rem] mx-[0.8rem] transition-all duration-[0.6s] overflow-hidden"
          style={{ height: "1.5rem", width: "1.5rem" }}
        >
          <div className="sc-nav-content-wrapper gap-[0.25rem] flex-col mt-[1rem] mb-[1rem] flex">
            {Projects.map((project, index) => (
              <div
                key={index}
                className="sc-nav-content closed w-full h-full transform-gpu transition-all relative overflow-hidden border border-[#d8c8af]"
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
              >
                <div className="sc-nav-content-block z-[6] bg-[#d8c8af] absolute top-0 bottom-0 left-0 right-0" />
                {project.media === "motion" ? (
                  <video
                    src={project.src}
                    preload="auto"
                    playsInline
                    muted
                    autoPlay
                    loop
                    className="thumbImg w-full aspect-video"
                  />
                ) : (
                  <img
                    src={project.src}
                    className="thumbImg w-full"
                    alt={project.name}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
