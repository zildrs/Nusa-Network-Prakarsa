import React from "react";

import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
