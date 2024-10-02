"use client";

import { useState } from "react";

interface IconCardCopyOverlayProps {
  emoji: string;
}

export default function IconCardCopyOverlay({
  emoji,
}: IconCardCopyOverlayProps) {
  const [copy, setCopy] = useState("Copy");

  const handleCopy = () => {
    navigator.clipboard.writeText(emoji);

    setCopy("Copied!");

    setTimeout(() => {
      setCopy("Copy");
    }, 2000);
  };

  return (
    <div
      className="hover-overlay bg-red-500/60 absolute h-full w-full rounded-box transparent opacity-0 group-hover:opacity-100 transition-all ease-in-out hover:cursor-pointer select-none flex items-center justify-center text-white font-bold"
      onClick={handleCopy}
    >
      {copy}
    </div>
  );
}
