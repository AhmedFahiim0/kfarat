import React from "react";
import FilterTab from "../../atoms/tab";

interface Props {
  tabs: Array<{ id: string; name: string }>;
  activeTab: string;
  onTabClick: (type: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onTabClick }: Props) {
  return tabs.map((type, idx) => (
    <FilterTab
      key={idx}
      activeTab={activeTab}
      tab={type}
      handleTabClick={() => onTabClick(type.id)}
    />
  ));
}
