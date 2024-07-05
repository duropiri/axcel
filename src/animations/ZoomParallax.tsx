// "use client";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// interface AnimationProps {
//   children?: React.ReactNode;
//   className?: string;
//   media: Media[];
// }

// interface Media {
//   src: string;
//   alt: string;
//   type: string;
//   scale: number;
//   top?: string | null;
//   left?: string | null;
//   width?: string | null;
//   height?: string | null;
//   fit?: string;
// }

// export default function ZoomParallax({
//   children,
//   className,
//   media,
// }: AnimationProps) {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });

//   // Create arrays for scales and blurs outside the map function
//   const scales = media.map((item) =>
//     useTransform(scrollYProgress, [0, 1], [1, item.scale])
//   );

//   const blurs = media.map((item, index) =>
//     index !== 0 ? useTransform(scrollYProgress, [0, 1], [0, 50]) : 0
//   );

//   return (
//     <div ref={container} className={styles.container}>
//       <div className={styles.sticky}>
//         {media.map((item, index) => (
//           <motion.div
//             key={index}
//             style={{
//               scale: scales[index] || 1,
//               filter: blurs[index] ? `blur(${blurs[index]}px)` : "none",
//             }}
//             className={styles.element}
//           >
//             {item.type === "image" && (
//               <div
//                 style={{
//                   top: item.top || "0%", // Default to '0%' if not specified
//                   left: item.left || "0%",
//                   width: item.width || "25vw", // Default to '25vw' if not specified
//                   height: item.height || "25vh", // Default to '25vw' if not specified
//                 }}
//                 className={styles.imageContainer}
//               >
//                 <Image
//                   src={item.src}
//                   fill
//                   alt={item.alt}
//                   //   placeholder="blur"
//                   objectFit={item.fit || "cover"}
//                 />
//               </div>
//             )}
//             {item.type === "video" && (
//               <div
//                 style={{
//                   top: item.top || "0%", // Default to '0%' if not specified
//                   left: item.left || "0%",
//                   width: item.width || "25vw", // Default to '25vw' if not specified
//                   height: item.height || "25vh", // Default to '25vw' if not specified
//                 }}
//                 className={styles.imageContainer}
//               >
//                 <video
//                   src={item.src}
//                   autoPlay={true}
//                   controls={false}
//                   loop
//                   muted
//                   style={{
//                     objectFit: "cover",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: "h-[300vh] w-full relative",
//   sticky: "sticky top-0 h-[100vh] w-full overflow-hidden",
//   element: "w-full h-full absolute top-0 flex items-center justify-center",
//   imageContainer: "relative",
// };
