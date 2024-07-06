"use client";
import React, { useRef, useState, useEffect, forwardRef } from "react";

interface HomeSectionProps {
  className?: string;
  project?: Project;
  projects?: Project[];
  index: number;
}

interface Project {
  name: string;
  brand: string;
  type: string;
  duration?: string | number;
  src: string;
  media: string;
  order?: string;
}

const HomeSection = forwardRef<HTMLDivElement, HomeSectionProps>(
  ({ className, project, projects, index }: HomeSectionProps, ref: any) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMuting, setIsMuting] = useState(false);

    const initializeAudio = () => {
      if (videoRef.current && !audioCtxRef.current) {
        const audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioCtxRef.current = audioCtx;

        const sourceNode = audioCtx.createMediaElementSource(videoRef.current);
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNodeRef.current = gainNode;

        sourceNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        setIsInitialized(true);
      }
    };

    const fadeAudio = (mute: boolean) => {
      if (gainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.setValueAtTime(
          gainNodeRef.current.gain.value,
          now
        );
        gainNodeRef.current.gain.linearRampToValueAtTime(
          mute ? 0 : 1,
          now + 0.5
        );
      }
    };

    const handleMuteToggle = () => {
      if (isMuting) return;
      setIsMuting(true);

      if (!isInitialized) {
        initializeAudio();
      }

      if (isMuted) {
        fadeAudio(false);
        setIsMuted(false);
        if (videoRef.current) {
          videoRef.current.muted = false;
        }
        setIsMuting(false);
      } else {
        setIsMuted(true);
        fadeAudio(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
          }
          setIsMuting(false);
        }, 500);
      }
    };

    useEffect(() => {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.src = project?.src || "";
              videoRef.current.play().catch(console.error);
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }, [project]);

    useEffect(() => {
      const loadGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const effectElements = gsap.utils.toArray("[data-speed]");
        effectElements.forEach((el: any) => {
          const speed = parseFloat(el.getAttribute("data-speed"));
          gsap.fromTo(
            el,
            { y: 0 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onRefresh: (self) => {
                  const start = Math.max(0, self.start);
                  const distance = self.end - start;
                  const end = start + distance / speed;
                  (self as any).setPositions(start, end);
                  if (self.animation) {
                    (self as any).animation.vars.y =
                      (end - start) * (1 - speed);
                    self.animation
                      .invalidate()
                      .progress(1)
                      .progress(self.progress);
                  }
                },
              },
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      };

      loadGSAP();
    }, []);

    return (
      <section ref={ref} className={`block w-full h-[100vh] ${className}`}>
        {project?.media === "motion" && (
          <section
            className={`${className} relative flex flex-col items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-black`}
          >
            <div
              className={`absolute flex flex-col max-w-[10ch] items-start justify-start uppercase pointer-events-none z-10 leading-none text-6xl ${
                project.order === "top-left" &&
                " top-[15%] left-0 ml-[4rem] sm:ml-[6rem]"
              }${
                project.order === "top-right" &&
                " top-[15%] right-0 mr-[4rem] sm:mr-[6rem]"
              }${
                project.order === "bottom-left" &&
                " bottom-[15%] left-0 ml-[4rem] sm:ml-[6rem]"
              }${
                project.order === "bottom-right" &&
                " bottom-[15%] right-0 mr-[4rem] sm:mr-[6rem]"
              }`}
            >
              <h1 className="font-bold">{project.name}</h1>
              <p className="text-lg">
                <span className="italic">for</span>{" "}
                <span className="font-bold">{project.brand}</span>
              </p>
            </div>
            <div
              className={`absolute flex flex-col items-start justify-start uppercase z-10 leading-none text-6xl ${
                project.order === "top-left" &&
                " bottom-[15%] right-0 mr-[4rem] sm:mr-[6rem]"
              }${
                project.order === "top-right" &&
                " bottom-[15%] right-0 mr-[4rem] sm:mr-[6rem]"
              }${
                project.order === "bottom-left" &&
                " bottom-[10%] left-0 ml-[4rem] sm:ml-[6rem]"
              }${
                project.order === "bottom-right" &&
                " bottom-[10%] right-0 mr-[4rem] sm:mr-[6rem]"
              }`}
            >
              <a className="text-lg underline" href="">
                View Project
              </a>
            </div>
            <div
              className="relative flex w-[100vh] sm:w-[100vw] h-[100vw] sm:h-[100vh] rotate-90 sm:rotate-0 overflow-hidden"
              data-speed="0.25"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-[100vh] sm:w-[100vw] h-[100vw] sm:h-[100vh] object-cover pointer-events-none brightness-50"
                preload="auto"
                poster={`${project.src}`}
              />
            </div>
            <div className="flex flex-row items-end justify-end absolute right-0 bottom-0 mr-4 sm:mr-10 mb-3 sm:mb-6 pointer-events-auto text-center medium-text uppercase mix-blend-difference leading-none">
              <div className="relative flex flex-row items-center gap-2">
                {index + 1 === projects?.length ? "" : "Scroll"}
                <svg
                  fill="currentColor"
                  className={`animate-bounce w-[2vw] md:w-[1vw] h-full ${
                    index + 1 === projects?.length && "hidden"
                  }`}
                  viewBox="0 0 12 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6 28 5.7735-10h-11.547002zm-1-27.99999996v18.99999996h2v-19.00000004z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <button
              onClick={handleMuteToggle}
              className="absolute mr-4 right-0 bottom-1/2 sm:translate-y-0 sm:mr-0 sm:right-auto sm:bottom-0 flex items-center justify-center rounded-full mix-blend-difference mb-3 sm:mb-6"
              aria-label="Mute or unmute video"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 icon icon-tabler icon-tabler-volume-off"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24 24H0z" fill="none" />
                  <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
                  <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
                  <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
                  <path d="M3 3l18 18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 icon icon-tabler icon-tabler-volume"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24 24H0z" fill="none" />
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.7 5a9 9 0 0 1 0 14" />
                  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
              )}
            </button>
          </section>
        )}
      </section>
    );
  }
);

export default HomeSection;
