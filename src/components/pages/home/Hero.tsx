"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Swiper from "swiper/bundle";

interface ComponentProps {
  className?: string;
  projects: Project[];
}

interface Project {
  name: string;
  brand: string;
  type: string;
  duration?: string | number;
  src: string;
  media: string;
}


const Hero = ({ className, projects }: ComponentProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setScreenSize("small");
      } else if (window.innerWidth <= 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set the initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swiper/swiper-bundle.min.js";
    script.onload = () => {
      if (carouselRef.current && projects.length > 0) {
        swiperInstance.current = new Swiper(carouselRef.current, {
          speed: 600,
          loop: true,
          autoHeight: false,
          centeredSlides: true,
          followFinger: true,
          // mousewheelControl: true,
          freeMode: true,
          slideToClickedSlide: false,
          slidesPerView: "auto",
          spaceBetween: "1%",
          rewind: false,
          mousewheel: {
            //forceToAxis: true
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          initialSlide: 0, // Ensure slider always starts on the first item
          /*
          breakpoints: {
            // mobile landscape
            480: {
              slidesPerView: 2,
              spaceBetween: "4%"
            },
            // tablet
            768: {
              slidesPerView: 3,
              spaceBetween: "4%"
            },
            // desktop
            992: {
              slidesPerView: 5,
              spaceBetween: "3%"
            }
          }
          */
        });

        const handleScroll = (event: WheelEvent) => {
          event.preventDefault();
          if (swiperInstance.current) {
            const scrollStep = event.deltaY * 0.2;
            if (scrollStep > 0) {
              swiperInstance.current!.slideNext(800);
            } else {
              swiperInstance.current!.slidePrev(800);
            }
          }
        };

        if (carouselRef.current) {
          carouselRef.current.addEventListener("wheel", handleScroll);
        }

        const updateSlideOpacity = () => {
          if (carouselRef.current) {
            const slides =
              carouselRef.current.querySelectorAll(".swiper-slide");
            slides.forEach((slide) => {
              slide.classList.add("opacity-35");
              slide.classList.remove("opacity-100");
            });

            const activeSlide = carouselRef.current.querySelector(
              ".swiper-slide-active"
            );
            activeSlide?.classList.remove("opacity-35");
            activeSlide?.classList.add("opacity-100");
          }
        };

        swiperInstance.current.on("slideChange", updateSlideOpacity);
        swiperInstance.current.on(
          "slideChangeTransitionEnd",
          updateSlideOpacity
        );

        updateSlideOpacity();

        const allVideos = Array.from(
          document.querySelectorAll<HTMLVideoElement>(".swiper-slide video")
        );

        const sliderDetails = () => {
          const activeSlide = document.querySelector(".swiper-slide-active");
          if (activeSlide) {
            if (
              activeSlide.querySelector("[project-media]")?.textContent ===
              "motion"
            ) {
              const video = activeSlide.querySelector("video");
              if (video) {
                video.currentTime = 0;
                video.play();
              }
            } else {
              allVideos.forEach((video) => {
                video.currentTime = 0;
                video.pause();
              });
            }

            document.querySelector("[project-display-type]")!.textContent =
              activeSlide.querySelector("[project-type]")!.textContent!;
            document.querySelector("[project-display-name]")!.textContent =
              activeSlide.querySelector("[project-name]")!.textContent!;
            document.querySelector("[project-display-index]")!.textContent =
              String(
                activeSlide.querySelector("[project-index]")!.textContent!
              ).padStart(2, "0");

            const index = parseFloat(
              activeSlide.querySelector("[project-index]")!.textContent!
            );
            const scrollProgress = (index / projects.length) * 100;
            gsap.to(".project-index-inner-container", {
              width: `${scrollProgress}%`,
              ease: "expo.inOut",
              duration: 1,
            });
          }
        };

        sliderDetails();

        swiperInstance.current.on("slideChange", () => {
          allVideos.forEach((video) => {
            video.currentTime = 0;
            video.pause();
          });
          setTimeout(sliderDetails, 600);
        });

        return () => {
          if (swiperInstance.current) {
            swiperInstance.current.destroy(true, true);
          }
          if (carouselRef.current) {
            carouselRef.current.removeEventListener("wheel", handleScroll);
          }
        };
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [projects]);

  return (
    <section className={`block w-screen overflow-x-hidden ${className}`}>
      <div className="h-[100dvh] w-full flex flex-col justify-end gap-[4rem]">
        <div
          ref={carouselRef}
          className="swiper w-full h-auto relative p-0 z-2"
        >
          <div className="swiper-wrapper flex justify-start items-center w-full h-auto transition-transform box-content">
            {projects.map((project, index) => (
              <div
                key={`slide-${index}`}
                className="swiper-slide flex-none aspect-video opacity-35 transition-opacity duration-200"
                style={{
                  width:
                    screenSize === "small"
                      ? "90vw"
                      : screenSize === "medium"
                      ? "calc((100vw - 30px) / 2)"
                      : "calc((100vw - 60px) / 3)",
                }}
              >
                <video
                  src={project.src}
                  preload="auto"
                  playsInline
                  muted
                  loop
                  className="block h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="project-details w-[0px] h-[0px] overflow-hidden"
                >
                  <div project-media="">{project.media}</div>
                  <div project-name="">{project.name}</div>
                  <div project-type="">{project.type}</div>
                  <div project-index="">{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="swiper-pagination"></div> */}
        </div>

        <div className="grid gap-4 grid-rows-[max-content_16ch_max-content] content-end justify-items-center mt-4 mb-4">
          <div className="text-[1.25rem] text-white">
            <div className="cilati">
              Type: <span project-display-type="" className="uppercase"></span>
            </div>
          </div>
          <div className="self-center text-center max-w-[90vw]">
            <h1
              project-display-name=""
              className="uppercase mt-0 mb-0 font-benzin font-normal text-[4rem] leading-none"
            ></h1>
          </div>
          <div className="row-span-1 col-span-1 self-center w-[96vw] gap-4 gap-y-4 text-white grid-rows-[auto] grid-cols-1 auto-cols-fr grid-flow-row sm:grid-flow-col justify-between items-center ml-auto mr-auto grid">
            <div className="row-span-1 col-span-1 self-center flex opacity-0 gap-[0.5rem]">
              <div className="hp-carousel-info-block">
                <div>FPS: 30.0</div>
              </div>
              <div className="hp-carousel-info-block">
                <div>E1: 700.0</div>
              </div>
              <div className="hp-carousel-info-block">
                <div>SHUTTER: 160.0</div>
              </div>
            </div>
            <div className="row-span-1 col-span-1 self-center justify-self-center text-[1.15rem]">
              <div className="cilati">Scroll To Explore</div>
            </div>
            <div className="row-span-1 col-span-1 self-center justify-self-center sm:justify-self-end flex items-center justify-center text-[#edebe9] gap-x-[10px]">
              <div project-display-index="" className="font-benzin"></div>
              <div className="project-index-outer-container w-[6rem] h-[0.25rem] bg-[#D8C8AF33] overflow-hidden">
                <div className="project-index-inner-container bg-[#edebe9] h-full w-full"></div>
              </div>
              <div className="font-benzin">
                {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
