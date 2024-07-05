"use client";
import React from "react";
import gsap from "gsap";
import { getChars } from "@/animations/NavigationMenu";
import { AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // GSAP Animations
    const linkHoverAnimation = async () => {
      // const { gsap } = await import("gsap");
      document.querySelectorAll(".hover-link").forEach((link) => {
        const mask = link.querySelector(".text-mask");

        // Set initial styles for GSAP to manage transform origin
        gsap.set(mask, { transformOrigin: "left center", scaleX: 0 });

        // Hover start: expand the mask from the left
        link.addEventListener("mouseenter", () => {
          gsap.to(mask, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "left center", // Ensures the origin is correct for expanding
          });
        });

        // Hover end: contract the mask to the right
        link.addEventListener("mouseleave", () => {
          gsap.to(mask, {
            scaleX: 0,
            duration: 0.3,
            ease: "power2.in",
            transformOrigin: "right center", // Shifts the origin to right for contraction
          });
        });
      });
    };

    const mobileMenuAnimation = async () => {
      // const { gsap } = await import("gsap");

      const mShow = document.querySelector(".m-show");
      const mClose = document.querySelector(".m-close");

      if (isOpen) {
        gsap.to(mShow, { y: "-100%", duration: 0.5 });
        gsap.to(mClose, { y: "0%", duration: 0.5 });
      } else {
        gsap.to(mShow, { y: "0%", duration: 0.5 });
        gsap.to(mClose, { y: "100%", duration: 0.5 });
      }
    };

    const animateMenu = () => {
      const menuContainer = document.querySelector(".m-menu");
      const menuItems = document.querySelectorAll(".m-menu-text");

      if (isOpen) {
        gsap.to(menuContainer, {
          opacity: 1,
          display: "grid",
          duration: 0.5,
        });

        menuItems.forEach((item) => {
          gsap.to(item, {
            y: "0%",
            duration: 0.5,
            ease: "power3.inOut",
            transform: "translate3d(0px, 0%, 0px) scale3d(1, 1, 1)",
            transformStyle: "preserve-3d",
          });
        });
      } else {
        gsap.to(menuContainer, {
          opacity: 0,
          display: "none",
          duration: 0.5,
        });

        menuItems.forEach((item) => {
          gsap.to(item, {
            y: "100%",
            duration: 0.5,
            ease: "power3.inOut",
            transform: "translate3d(0px, -100%, 0px) scale3d(1, 1, 1)",
            transformStyle: "preserve-3d",
          });
        });
      }
    };

    linkHoverAnimation();
    window.addEventListener("DOMContentLoaded", linkHoverAnimation);

    mobileMenuAnimation();
    window.addEventListener("DOMContentLoaded", mobileMenuAnimation);

    animateMenu();
    window.addEventListener("DOMContentLoaded", animateMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("DOMContentLoaded", linkHoverAnimation);
      window.removeEventListener("DOMContentLoaded", mobileMenuAnimation);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="fixed w-full justify-center items-center flex text-[#d8c8af] uppercase z-[999]">
      <div className="flex items-end justify-between mt-[0.8rem] mx-auto w-[95vw]">
        <a href="/" aria-current="page" className="z-[100] w-[12rem] relative">
          {/* <div className="h-[1.7rem] pb-[4px]"></div> */}
          <div className="hidden nav-logo-text gap-[1rem]">
            <div
              id="w-node-_3b3cb695-dd56-f0a2-92e0-bda8175e9235-175e9231"
              className="logo-text photo"
            >
              A photo <span className="logomark-c">by</span>
            </div>
            <div
              id="w-node-_3b3cb695-dd56-f0a2-92e0-bda8175e9239-175e9231"
              className="logo-text film"
            >
              A film <span className="logomark-c">by</span>
            </div>
            <div
              id="w-node-da807638-2bef-c029-72be-0e0b942549e1-175e9231"
              className="logo-text connect"
            >
              CONNECT <span className="logomark-c">with</span>
            </div>
          </div>
          {/* <div className="w-[15rem]">
            <div className="logo-embed-1 w-embed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 257 30"
                width="100%"
                height="100%"
              >
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M241.74 13.27a43.55 43.55 0 0 0-5.03-2.95l-1.88-1c-.78-.43-1.58-.85-2.36-1.26-1.4-.73-3.36-1.13-4.33-2.44-.45-.62-.62-1.52.09-2.12a1.6 1.6 0 0 1 1.12-.37c1.16.07 1.82 1.12 2.5 1.9.62.72 1.27 1.47 1.95 2.17a10.24 10.24 0 0 0 5.18 3.08c1.36.3 2.68.08 3.74-.63a4.11 4.11 0 0 0 1.75-2.77c.28-1.72-.8-3.65-2.64-4.67C239.37.83 236.55.2 232.7.17c-3.32-.03-5.94.5-8.28 1.67a7.86 7.86 0 0 0-4.4 6.39 7.55 7.55 0 0 0 3.14 6.75c2.34 1.7 5.1 2.92 7.71 4.14a28.8 28.8 0 0 1 3.14 1.63c.83.52 2.03 1.1 2.5 2 .93 1.78-1.18 2.47-2.62 2.02-1.85-.57-3.66-2.34-5.22-3.46a179.78 179.78 0 0 0-21.6-13.41c-1.4-.73-3.37-1.13-4.34-2.45-.45-.62-.62-1.52.09-2.12a1.6 1.6 0 0 1 1.12-.36c1.16.06 1.82 1.12 2.5 1.9.62.72 1.27 1.47 1.95 2.17a10.24 10.24 0 0 0 5.18 3.08c1.36.3 2.68.08 3.74-.63a4.11 4.11 0 0 0 1.76-2.78c.28-1.72-.81-3.64-2.65-4.67-2.46-1.38-5.28-2-9.14-2.04-3.32-.03-5.94.5-8.28 1.68a7.86 7.86 0 0 0-4.4 6.38 7.55 7.55 0 0 0 3.14 6.75c1.47 1.07 3.14 1.9 4.75 2.7l1.24.61c.57.3 1.15.56 1.72.83 1.07.5 2.14 1.01 3.14 1.64.84.52 1.92 1.15 2.47 1.98.42.62.52 1.53.02 2.1-.1.1-.22.2-.34.26-.44.25-1.03.25-1.51.07-1.16-.43-1.67-1.55-2.45-2.41-1.18-1.3-2.38-2.63-3.71-3.79-1.28-1.11-2.96-1.6-5-1.43-2.29.2-3.76 1.83-3.67 4.08a5.45 5.45 0 0 0 2.87 4.58c5.25 3.2 15.81 4.85 20.04-.66.6-.79 1.2-1.75 2.17-1.9 1.14-.2 2.09.8 2.92 1.62 6.02 5.9 18.95 5.04 22.22-3.48 1.2-3.11-.24-6.47-2.87-8.34Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M256.94 15.26c-.01-2.2-.04-4.4-.02-6.6.01-2.5.03-5.01.03-7.52V.77c-.02-.01-.04-.03-.07-.03-.8 0-1.6.05-2.4.04-2.82-.06-5.63.05-8.45.05v13.7c0 1.18.06 5.57.1 9.04a4.67 4.67 0 0 0 4.64 4.62h6.18V17.51l-.01-2.25Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M193.17 15.42c-.01-2.2-.03-4.42-.02-6.64.01-2.53.03-5.05.03-7.58V.82c-.02 0-.04-.03-.07-.03-.8 0-1.6.05-2.4.04-2.86-.05-5.69.05-8.53.05V14.7c0 1.19.06 5.6.1 9.1a4.7 4.7 0 0 0 4.67 4.66H193.18V15.42Z"
                ></path>
                <path
                  className="l-k"
                  fill="currentColor"
                  d="m179.16 21.3-.05-.24c-.42-2.1-.84-4.18-1.25-6.03a93.78 93.78 0 0 0-1.02-4.27c-.45-1.65-.68-2.73-1.89-2.94-1.21-.16-2.63.7-4.1 2.54a39 39 0 0 0-1.5 2.06l-1.06 1.5-.06.08c-.36.52-.75 1.06-1.14 1.47-.27.28-.51.41-.64.36-.12-.05-.13-.27-.02-.59.25-.8.57-1.48.89-1.9l.38-.52a18.2 18.2 0 0 1 2.75-3.23c1.23-1.01 2.52-1.78 3.76-2.17a6.17 6.17 0 0 1 2.2-.3c.9.1 1.16.17 1.98.31 2.68 1.13 2-2.63 1.38-4.5-.25-.75-.6-2.03-1.61-1.98l-.58-.01c-.52-.01-.38-.02-.9-.02-1-.01-2.03 0-3.04.02l-.73.01c-.61 0-1.23.03-1.85.01-.38 0-.83-.06-1.17.14-.29.17-.4.52-.5.85-.16.54-.31 1.1-.45 1.7-.13.57-.41 1.23-.6 1.86-.63 2.02-1.26 4.27-2.04 6.52l-.01-2.56-.02-6.39c0-1.29-.53-2.07-1.47-2.1-3.08-.02-5.34-.09-8.41-.08 0 3.1-.04 6.13-.03 9.23.03 6.15.1 12.35.1 18.27 1.5 0 2.2-.03 3.71-.02l4.23-.01c1.5 0 1.94-.3 1.94-1.43 0-1.08.04-2.27-.01-3.46-.05-1.22-.3-2.34-.26-3.75.01-.19.02-.6.21-.85l.03-.03v-.01c.22-.24.45-.2.52-.03.94 2.18 1.33 4.59 2.23 7.3l.09.27a2.72 2.72 0 0 0 2.55 1.88h.01c2.7-.07 4.68.02 7.38-.03l1.62.03c.35 0 .6-.13.7-.34.05-.13.09-.36-.25-.8-1.15-1.53-1.56-3.68-2-5.81Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M120.52 25.68c1.52-1.83 2-4.14 2.03-7.26l-.05-4.58c-.04-2.55.04-5.07.04-7.6V1.36c0-.26.1-.44-.13-.55-.3-.14-.86-.05-1.18-.05-.59 0-1.17 0-1.76.02-.87.02-1.73.06-2.6.09-.95.03-1.91-.01-2.84.24-.86.23-1.66.64-2.34 1.2-1.36 1.1-1.81 2.77-1.94 4.15-.21 1.9-.1 3.95.35 5.86.57 2.35 1.54 4.69 2.2 7.03.48 1.52 1.12 3.93-.07 5.28-.77.88-1.3.68-1.69-.26-.67-1.63-.16-3.87-.33-5.58-.36-3.95-1.51-7.71-2.08-11.67-.56-2.9-.3-5.95-3.37-6.29-.92-.1-1.82-.1-2.74-.1h-2.78c-.52 0-1.48-.14-1.7.5-.18.48-.08 1.22-.08 1.73 0 1.06.08 2.11.08 3.17v4.46c.01 2.95.01 6 .15 9 .16 4.09 2.92 7.01 6.25 8.45 1.42.6 2.93.9 4.87.9 1.04 0 4.15-.09 5.41-.26 2.65-.35 4.94-1.36 6.3-3Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M63.83 25.46c-.44.25-1.02.25-1.5.07-1.17-.44-1.68-1.55-2.46-2.42-1.18-1.29-2.39-2.62-3.72-3.79-1.27-1.11-2.95-1.6-5-1.43-2.3.19-3.77 1.83-3.67 4.08a5.46 5.46 0 0 0 2.87 4.59c3.3 2 6.95 2.34 10.18 2.34h.6c2.73-.03 5.23-.72 7.44-2.03 2.4-1.42 3.71-3.06 4.15-5.18.67-3.27-.47-6.07-3.29-8.07-1.58-1.13-3.34-2.06-5.03-2.95l-1.88-1.01-2.37-1.26c-1.4-.73-3.36-1.13-4.33-2.45-.47-.63-.63-1.57.15-2.17.28-.21.63-.32.99-.32 1.2.03 1.87 1.11 2.56 1.9.63.73 1.28 1.48 1.96 2.18a10.25 10.25 0 0 0 5.19 3.08c1.35.31 2.68.09 3.74-.62a4.11 4.11 0 0 0 1.76-2.78c.28-1.73-.8-3.65-2.65-4.68-2.46-1.38-5.29-2-9.16-2.04-3.31-.03-5.94.5-8.28 1.68a7.87 7.87 0 0 0-4.41 6.39 7.56 7.56 0 0 0 3.15 6.75c1.47 1.08 3.14 1.9 4.76 2.7l1.23.62c.57.3 1.16.56 1.73.83a28.9 28.9 0 0 1 3.14 1.64c.84.52 1.92 1.15 2.48 1.98.41.62.51 1.54 0 2.1-.09.1-.2.2-.33.27Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="m148.38 26.37-.19.1.2-.1a1662.44 1662.44 0 0 0-1.33-3.78c-.95-2.75-1.94-5.6-2.85-8.4-1.05-3.2-2.04-6.48-3.01-9.65l-.69-2.24c-.27-.9-.86-1.32-1.84-1.32h-.04c-2.85.03-5.05.03-7.13 0-1.04-.02-1.67.44-1.98 1.45l-.93 3.02c-1.52 4.97-3.09 10.1-4.7 15.14l-.33 1.06c-.36 1.17-.68 2.35-1.1 3.5a14.19 14.19 0 0 1-1.21 2.48c-.16.23-.39.51-.34.81.06.42.6.47.92.47H124c1.6-.01 3.25-.02 4.87 0h.09c1.34 0 2.4-1.05 3.26-2.23a8.24 8.24 0 0 0 1.47-3.85c.08-.61.1-1.23.1-1.86-.02-.5-.21-1.18.21-1.58.15-.14.5-.13.7-.08.22.05.35.21.45.4.05.09.1.18.13.28.36.93.66 1.88.97 2.82.46 1.34.85 2.7 1.26 4.06.14.43.28 1.57.65 1.86.22.18.73.08 1 .08 2.7 0 5.35.1 8.03.1 1.12 0 1.58 0 1.77-.32.2-.33-.03-1.23-.58-2.23Zm-14.22-8.6a.51.51 0 0 1-.63-.02 1.09 1.09 0 0 1-.32-.55l-.27-.84c-.6-1.79-1.2-3.57-1.66-5.4-.47-1.9-1-3.78-1.38-5.7-.04-.21-.05-.65.24-.7.38-.06.46.31.54.6.87 2.92 1.81 5.82 2.7 8.74l.63 2.04.13.37c.13.36.4.98.14 1.33a.62.62 0 0 1-.12.13Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="M73.9 28.58v.33h7.06a3.83 3.83 0 0 0 3.83-3.72l.01-.9c0-2.85.01-5.8-.02-8.7 0-.64.2-.7.83-.72.27-.01.45.03.54.12.1.1.14.29.13.6a191.16 191.16 0 0 0 0 5.62v1.04c0 2.23.06 4.44.06 6.66h9.64c0-2.54-.11-5.08-.08-7.62V16.8c0-2.39.14-4.79.15-7.2l.03-8.14c0-.27.14-.55-.16-.67-.3-.11-.7-.05-1-.03-.5.02-.98 0-1.47 0h-7.57c-.47 0-3.05-.23-2.83.57.73 2.73 1.46 5.64 2.16 8.32l.55 2.1.13.42c.06.22.14.57.18.8.03.17.06.34-.01.52a.5.5 0 0 1-.41.3c-.32.04-.47-.29-.54-.54a341 341 0 0 0-1.07-3.77c-.46-1.57-.93-3.2-1.37-4.8-.18-.68-.31-1.37-.41-2.07-.06-.36-.1-.71-.14-1.07-.02-.35-.23-.75-.63-.75h-5.3L73.9.82V6.2c0 1.66-.02 3.32-.01 4.98l-.01 10.97c-.01 2.15.02 4.3.03 6.44Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M7.87 13.83a26.2 26.2 0 0 0 1.46 3.4 40.52 40.52 0 0 1 1.61 3.56c.22.57.45 1.17.6 1.77.1.44.12.95.43 1.3.06.08.14.15.23.2.13.08.3.1.44.06.53-.18.23-.92.12-1.27l-.1-.38a25.42 25.42 0 0 0-1.44-3.9c-1.83-4.05-3.8-7.08-3.9-11.34-.02-.7 0-1.41.08-2.12.06-.6.1-1.24.28-1.86a3.4 3.4 0 0 1 .96-1.54c1.05-.96 2.12-.9 3.19-.9h9.92c0 3.5.06 7.05.06 10.58 0 4.2 0 8.4-.07 12.6-.02 1.3-.11 2.8-.89 3.91a2.32 2.32 0 0 1-1.96 1.05h-1.87c-2.62 0-5.3.09-7.96.1-1.34.02-2.68.02-4.02.02-1.35 0-3.3.2-4.25-.87-.47-.52-.54-1.25-.58-1.93-.2-3.2-.2-4.86-.19-8.06v-3.94c0-.56-.09-1.18.14-1.71.2-.5.72-.63 1.2-.65 1-.06 2-.12 3-.13.85 0 1.77.03 2.49.55.5.38.8.92 1.02 1.5Z"
                ></path>
                <path
                  className="l-hide"
                  fill="currentColor"
                  d="m47.52 14.62-.15-1.26c-.1-.9-.21-1.83-.38-2.74C45.85 4.61 41.38.62 35.6.47c-5.16-.14-9.25 2.56-11.24 7.39a18.54 18.54 0 0 0-1.05 9.86c.95 6.77 5.56 11.17 11.74 11.2h.11c3.92 0 6.93-1.39 9.2-4.24 2.03-2.57 3.03-5.75 3.16-10.03v-.03Zm-11.4 8.67c-.04.06-.1.1-.15.14-.22.16-.47.08-.6-.15-.14-.22-.16-.5-.17-.77l-.05-1.14c-.1-2.42-.22-4.85-.18-7.3.04-2.53.03-5.07.17-7.62.02-.29.12-.85.41-.85.4 0 .37.48.38.87.07 3.94.22 7.87.32 11.81l.07 2.77.03.5c.02.48.12 1.33-.22 1.74Z"
                ></path>
              </svg>
            </div>
          </div> */}
          <div className="relative text-6xl uppercase font-extrabold">
            Axcel
            <AnimatePresence>
              <span className="text-sm">{getChars("Raul")}</span>

              <span className="right-0 text-lg font-light">
                {getChars("®")}
              </span>
            </AnimatePresence>
          </div>
        </a>
        <div className="hidden sm:flex gap-[2rem] items-center pb-[6px] text-[1.2rem]">
          <a href="/photo" className="hover-link relative">
            <div>Photo</div>
            <div
              aria-hidden="true"
              className="text-mask bg-black opacity-30 absolute top-0 bottom-0 left-0 right-0 h-full"
            ></div>
          </a>
          <a href="/film" className="hover-link relative">
            <div>Film</div>
            <div
              aria-hidden="true"
              className="text-mask bg-black opacity-30 absolute top-0 bottom-0 left-0 right-0 h-full"
            ></div>
          </a>
          <a href="/connect" className="hover-link relative">
            <div>Connect</div>
            <div
              aria-hidden="true"
              className="text-mask bg-black opacity-30 absolute top-0 bottom-0 left-0 right-0 h-full"
            ></div>
          </a>
        </div>
        <div className="nav-m-menu sm:hidden z-[100] h-[1.5rem] gap-4 text-center grid grid-rows-[auto] grid-cols-1 auto-cols-fr pb-1.5 font-benzin font-bold text-base relative overflow-hidden">
          <div
            className="m-show absolute inset-0 flex items-center justify-center"
            onClick={toggleMenu}
          >
            Menu
          </div>
          <div
            className="m-close inset-0 flex items-center justify-center translate-y-full"
            onClick={toggleMenu}
          >
            Close
          </div>
        </div>
      </div>
      <div className="m-menu z-[90] gap-4 gap-y-[5rem] bg-black flex flex-col grid grid-rows-[1fr_0.5fr] grid-cols-1 auto-cols-fr justify-center items-center ml-auto mr-auto px-[2.5vw] hidden fixed inset-0">
        <div className="flex items-center flex-col gap-[2.5rem]">
          <a
            href="/photo"
            className="font-benzin text-[3rem] overflow-hidden max-w-[100%] block"
          >
            <div className="m-menu-text">PHOTO</div>
          </a>
          <a
            href="/film"
            className="font-benzin text-[3rem] overflow-hidden max-w-[100%] block"
          >
            <div className="m-menu-text">FILM</div>
          </a>
          <a
            href="/connect"
            className="font-benzin text-[3rem] overflow-hidden max-w-[100%] block"
          >
            <div className="m-menu-text">CONNECT</div>
          </a>
        </div>
        <div className="flex items-center flex-col gap-[2rem]">
          <div className="flex gap-[1.5rem]">
            <a
              href="https://www.instagram.com/joshuakissi/"
              target="_blank"
              className="w-[1.85rem] h-[1.85rem] opacity-[88%] max-w-[100%] block"
            >
              <div className="w-embed">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99805 3C6.13905 3 3 6.14195 3 10.002V20.002C3 23.861 6.14195 27 10.002 27H20.002C23.861 27 27 23.858 27 19.998V9.99805C27 6.13905 23.858 3 19.998 3H9.99805ZM22 7C22.552 7 23 7.448 23 8C23 8.552 22.552 9 22 9C21.448 9 21 8.552 21 8C21 7.448 21.448 7 22 7ZM15 9C18.309 9 21 11.691 21 15C21 18.309 18.309 21 15 21C11.691 21 9 18.309 9 15C9 11.691 11.691 9 15 9ZM15 11C13.9391 11 12.9217 11.4214 12.1716 12.1716C11.4214 12.9217 11 13.9391 11 15C11 16.0609 11.4214 17.0783 12.1716 17.8284C12.9217 18.5786 13.9391 19 15 19C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15C19 13.9391 18.5786 12.9217 17.8284 12.1716C17.0783 11.4214 16.0609 11 15 11Z"
                    fill="#D8C8AF"
                  ></path>
                </svg>
              </div>
            </a>
            <a href="#" className="w-[1.85rem] h-[1.85rem] opacity-[88%] max-w-[100%] block">
              <div className="w-embed">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 3.99902C21.22 4.46202 19.655 5.09302 18.735 5.27502C18.708 5.28202 18.686 5.29102 18.66 5.29802C17.847 4.49602 16.733 3.99902 15.5 3.99902C13.015 3.99902 11 6.01402 11 8.49902C11 8.63002 10.989 8.87102 11 8.99902C7.647 8.99902 5.095 7.24302 3.265 4.99902C3.066 5.49902 2.979 6.28902 2.979 7.03102C2.979 8.43202 4.074 9.80802 5.779 10.661C5.465 10.742 5.119 10.8 4.759 10.8C4.178 10.8 3.563 10.647 3 10.183C3 10.2 3 10.216 3 10.234C3 12.192 5.078 13.525 6.926 13.896C6.551 14.117 5.795 14.139 5.426 14.139C5.166 14.139 4.246 14.02 4 13.974C4.514 15.579 6.368 16.481 8.135 16.513C6.753 17.597 5.794 17.999 2.964 17.999H2C3.788 19.145 6.065 20 8.347 20C15.777 20 20 14.337 20 8.99902C20 8.91302 19.998 8.73302 19.995 8.55202C19.995 8.53402 20 8.51702 20 8.49902C20 8.47202 19.992 8.44602 19.992 8.41902C19.989 8.28302 19.986 8.15602 19.983 8.09002C20.773 7.52002 21.458 6.80902 22 5.99902C21.275 6.32102 20.497 6.53702 19.68 6.63502C20.514 6.13502 21.699 4.94302 22 3.99902Z"
                    fill="#D8C8AF"
                  ></path>
                </svg>
              </div>
            </a>
            <a
              href="mailto:hello@joshuakissi.com"
              className="w-[1.85rem] h-[1.85rem] opacity-[88%] max-w-[100%] block"
            >
              <div className="w-embed">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 4C8.48867 4 4 8.48867 4 14V36C4 41.5113 8.48867 46 14 46H36C41.5113 46 46 41.5113 46 36V14C46 8.48867 41.5113 4 36 4H14ZM13 16H37C37.18 16 37.3498 16.0203 37.5098 16.0703L27.6797 25.8906C26.1997 27.3706 23.7905 27.3706 22.3105 25.8906L12.4902 16.0703C12.6502 16.0203 12.82 16 13 16ZM11.0703 17.4902L18.5898 25L11.0703 32.5098C11.0203 32.3498 11 32.18 11 32V18C11 17.82 11.0203 17.6502 11.0703 17.4902ZM38.9297 17.4902C38.9797 17.6502 39 17.82 39 18V32C39 32.18 38.9797 32.3498 38.9297 32.5098L31.4004 25L38.9297 17.4902ZM20 26.4102L20.8906 27.3105C22.0206 28.4405 23.5102 29 24.9902 29C26.4802 29 27.9598 28.4405 29.0898 27.3105L29.9902 26.4102L37.5098 33.9297C37.3498 33.9797 37.18 34 37 34H13C12.82 34 12.6502 33.9797 12.4902 33.9297L20 26.4102Z"
                    fill="#D8C8AF"
                  ></path>
                </svg>
              </div>
            </a>
          </div>
          <div className="flex flex-col text-center gap-[0.25rem]">
            <div>2024 Axcel Raul®. &nbsp;All Rights Reserved..</div>
            <div className="flex justify-center gap-[4px]">
              <div>Site by</div>
              <div className="flex flex-col gap-[1px]">
                <div>Relay Digital Agency</div>
                <div className="w-full h-[0.6px] bg-[#d8c8af]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
