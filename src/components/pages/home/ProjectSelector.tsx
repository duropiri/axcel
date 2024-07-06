import React, { useEffect } from "react";
import gsap from "gsap";

interface ProjectSelectorProps {
  navRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  navContainerRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;
  projects: { name: string; src: string; media: string }[];
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  navRefs,
  navContainerRef,
  currentIndex,
  projects,
  sectionRefs,
}) => {
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
  }, [navRefs, navContainerRef, sectionRefs]);

  return (
    <aside
      className="sc-nav closed z-10 justify-center items-center duration-1000 transition-all hidden sm:flex fixed bottom-[1rem] left-[1rem]"
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
          {projects.map((project, index) => (
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
  );
};

export default ProjectSelector;
