import React, { useEffect, useState } from "react";
import HoverEffect from "hover-effect";

interface HeroComponentProps {
  className?: string;
  name?: string;
  bio?: string;
  infos?: Info[];
}

interface Info {
  header: string;
  info: string[];
}

function Hero({ className, name, bio, infos }: HeroComponentProps) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    const effect = new HoverEffect({
      parent: document.querySelector(".connect-hero-image") as HTMLElement,
      intensity: 0.3,
      imagesRatio: 5 / 4,
      image1: "/images/image2.jpg",
      image2: "/images/image3.jpg",
      displacementImage: "/images/displacement.webp",
    });

    return () => {
      effect && effect.dispose && effect.dispose();
    };
  }, []);

  const handleCopyClick = (index: number, email: string) => {
    setClickedIndex(index);
    setCopiedEmail(email);
    navigator.clipboard.writeText(email).then(
      () => {
        console.log(`Copied to clipboard: ${email}`);
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return (
    <section className={`${className} transform-gpu h-[100dvh] overflow-x-hidden w-full hero`}>
      <div className="w-[96vw] h-full mx-auto">
        <div className="size-full grid-rows-[auto] sm:grid-cols-[0.5fr_1fr] [grid-auto-columns:1fr] grid">
          <div className="w-node self-start justify-self-start h-full w-full sm:w-auto sm:max-w-[40ch] gap-y-[0.75rem] text-left flex-col justify-between items-start sm:mr-[4vw] pt-[9rem] pb-[2rem] flex z-10">
            <div>
              <span className="pr-[2px] font-benzin font-black">{name}</span> {bio}
            </div>
            <div className="gap-x-[7vw] gap-y-[1rem] grid-rows-[auto] grid-cols-[1fr] [grid-auto-columns:1fr] grid w-full sm:w-auto">
              {infos?.map((info, index) => (
                <div
                  key={index}
                  className="gap-y-[8px] text-left flex-col items-start text-[1rem] font-[500] flex"
                >
                  <h2 className="uppercase font-benzin text-[0.85rem] leading-[1.1]">
                    {info.header}
                  </h2>
                  <div className="w-full h-[1px] bg-[#d8c8af] opacity-[0.7]"></div>
                  {info.info?.map((email, emailIndex) => (
                    <div
                      key={emailIndex}
                      className="gap-[1rem] uppercase justify-center flex"
                      role="link"
                      aria-label={email}
                    >
                      <a href={`mailto:${email}`} className="uppercase">
                        {email}
                      </a>
                      <div
                        className="group w-[1rem] h-[1rem] mt-[4px] relative transition-all cursor-pointer"
                        onClick={() => handleCopyClick(index, email)}
                      >
                        <div className="w-[80%] h-[80%] border border-[#d8c8af] bg-black rounded"></div>
                        <div className="w-[80%] h-[80%] border border-[#d8c8af] bg-black rounded absolute top-[-17%] left-auto right-0 group-hover:translate-x-[-10%] group-hover:translate-y-[17%] transition-all duration-[1000ms]"></div>
                        <div className="w-[12ch] gap-0 opacity-0 text-left grid grid-rows-[auto_auto] grid-cols-1 auto-cols-[1fr] pt-0 text-[0.85rem] font-normal absolute top-0 bottom-0 left-8 right-auto group-hover:opacity-100 transition-all duration-[1000ms] pointer-events-none">
                          <div
                            id="w-node-eb60eac7-6e49-17ac-4c5a-59b52c3f97cb-57647ad5"
                            className="copy-text w-node2"
                          >
                            {clickedIndex === index && copiedEmail === email ? "COPIED EMAIL" : "COPY EMAIL"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-node md:grid-rows-[auto] grid-cols-[1fr] top-0 sticky md:relative md:grid-cols-[max-content_auto] [grid-auto-columns:1fr] sm:grid">
            <div className="w-full md:w-[37vw] h-[100vh] overflow-hidden [grid-area:1_/_1_/_2_/_2] md:[grid-area:span_1_/_span_1_/_span_1_/_span_1] connect-hero-image"></div>
            <div className="pb-[2rem] [grid-area:1_/_1_/_2_/_2] md:[grid-area:span_1_/_span_1_/_span_1_/_span_1] self-end justify-self-end">
              <div className="relative bottom-[3%] z-[5] w-auto">
                <div className="text-right uppercase pb-[7px] pr-[8px] text-[1.275rem]">
                  connect <span className="[text-transform:none]">with</span>
                </div>
                <div className="relative text-6xl uppercase font-extrabold">
                  Axcel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
