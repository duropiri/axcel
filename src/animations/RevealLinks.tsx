import { motion } from "framer-motion";

interface FlipLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  outside?: string;
  inside?: string;
}

export const FlipLink = ({
  className,
  children,
  href,
  outside = "200",
  inside = "0",
}: FlipLinkProps) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      // href={href}
      className={`relative block overflow-hidden ${
        className ? className : " whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      }`}
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: `-${outside}%` },
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { y: `${outside}%` },
          hovered: { y: `${inside}%` },
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};
