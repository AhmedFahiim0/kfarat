import { motion } from "framer-motion";
import React from "react";

interface Props {
  tab: { id: string; name: string };
  activeTab: string;
  handleTabClick: () => void;
}

export default function FilterTab({ activeTab, tab, handleTabClick }: Props) {
  return (
    <div
      className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${
        activeTab === tab.id ? "active" : ""
      }`}
      onClick={handleTabClick}
    >
      {activeTab === tab.id && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-2xl bg-white"
        ></motion.div>
      )}
      <span className="relative text-button-uppercase z-[1]">{tab.name}</span>
    </div>
  );
}
