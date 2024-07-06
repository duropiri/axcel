"use client";
import React from "react";
import Hero from "@/components/pages/connect/Hero";
import { Name, Bio, Info } from "@/data/Connect";

function Connect() {
  return (
    <main className="flex flex-col items-center justify-between text-[#d8c8af] overflow-x-hidden h-screen w-screen">
      <Hero name={Name} bio={Bio} infos={Info} />
    </main>
  );
}

export default Connect;
