import React from "react";

interface IndexIndicatorProps {
  currentIndex: number;
  total: number;
}

const IndexIndicator: React.FC<IndexIndicatorProps> = ({ currentIndex, total }) => {
  return (
    <div
      className="w-full pt-[5.5rem] fixed top-0 bottom-auto left-auto right-0 font-bold"
      style={{
        opacity: currentIndex === -1 ? 0 : 1,
        transition: "opacity 0.5s",
      }}
    >
      <div className="flex justify-end mr-[2.5vw] font-benzin text-[1.25rem]">
        <div className="relative h-[2ch] w-[2ch] items-end grid overflow-hidden">
          {Array.from({ length: total }, (_, index) => (
            <div
              key={index}
              h-index=""
              id={`w-node-b6c5c2b0-cf6f-792c-4f54-594384552a7${index + 9}`}
              className="index-num justify-end absolute -mb-[0.15rem]"
              style={{
                transform: `translate(0px, ${
                  index === currentIndex ? "0%" : `${index > currentIndex ? "110%" : "-110%"}`
                })`,
                transition: "transform 0.5s",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
        <div>/</div>
        <div>{String(total).padStart(2, "0")}</div>
      </div>
    </div>
  );
};

export default IndexIndicator;
