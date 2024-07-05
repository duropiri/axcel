"use client";
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

interface AnimationProps {
  className?: string;
  projects?: ProjectDetails[];
}

export interface ProjectDetails {
  title?: string;
  description?: string;
  src?: string;
  color?: string;
  cursor?: string;
}

export default function ProjectGallery({
  className,
  projects = [],
}: AnimationProps) {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className={styles.main}>
      <div className={styles.body}>
        {projects.map((project, index) => {
          return (
            <Project
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              setModal={setModal}
              isLast={index === projects.length - 1}
            ></Project>
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </main>
  );
}

function Project({
  index,
  title,
  description,
  setModal,
  isLast,
}: {
  index: number;
  title?: string;
  description?: string;
  setModal: (modal: any) => void;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        ...styles.project,
        ...(isLast && styles.lastProject),
      }}
      onClick={() => setModal({ active: true, index })}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
        (e.currentTarget.querySelector("h2") as HTMLElement).style.transform =
          "translateX(-10px)";
        (e.currentTarget.querySelector("p") as HTMLElement).style.transform =
          "translateX(10px)";
        setModal({ active: true, index: index });
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "1";
        (e.currentTarget.querySelector("h2") as HTMLElement).style.transform =
          "translateX(0)";
        (e.currentTarget.querySelector("p") as HTMLElement).style.transform =
          "translateX(0)";
        setModal({ active: false, index: index });
      }}
    >
      <h2 style={styles.projectTitle}>{title}</h2>
      <p style={styles.projectDescription}>{description}</p>
    </div>
  );
}

function Modal({
  modal,
  projects,
}: {
  modal: { active: boolean; index: number };
  projects: ProjectDetails[];
}) {
  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };

  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
    //   xMoveCursorLabel(pageX);
    //   yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modalContainer}
      >
        <div style={{ ...styles.modalSlider, top: `${index * -100}%` }}>
          {projects.map((project, i) => (
            <div
              className={styles.modal}
              style={{ backgroundColor: project.color }}
              key={`modal_${i}`}
            >
              <Image
                src={`/images/${project.src}`}
                width={300}
                height={0}
                alt={project.title || "image"}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className={`bg-black ${styles.cursor}`}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          {projects[modal.index]?.cursor || "View"}
        </motion.div>
      </motion.div>
    </>
  );
}

const styles = {
    main: "flex h-[100vh] items-center justify-center",
    body: "w-[1000px] flex flex-col items-center justify-center",
    project: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "50px 100px",
      borderTop: "1px solid rgb(201, 201, 201)",
      cursor: "pointer",
      transition: "all 0.2s",
    } as CSSProperties,
    lastProject: {
      borderBottom: "1px solid rgb(201, 201, 201)",
    } as CSSProperties,
    projectTitle: {
      fontSize: "60px",
      margin: "0px",
      fontWeight: 400,
      transition: "all 0.4s",
    } as CSSProperties,
    projectDescription: {
      transition: "all 0.4s",
      fontWeight: 300,
    } as CSSProperties,
    modalContainer:
      "h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center",
    modalSlider: {
      height: "100%",
      width: "100%",
      position: "absolute",
      transition: "top 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
    } as CSSProperties,
    modal: "h-full w-full flex items-center justify-center",
    cursor:
      " w-[80px] h-[80px] rounded-full text-white absolute z-2 flex items-center justify-center text-[14px] font-normal pointer-events-none",
    cursorLabel:
      "absolute text-center bg-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };
