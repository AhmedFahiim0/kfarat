import React from "react";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: Props) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
