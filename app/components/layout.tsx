import React from "react";

import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
  locale: string;
}

export const Layout = ({ children, locale }: LayoutProps) => {
  return (
    <main>
      <Header locale={locale} />
      {children}
      <Footer />
    </main>
  );
};
