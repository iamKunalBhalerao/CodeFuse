import { Metadata } from "next";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard - CodeFuse",
  description:
    "dashboard - Manage your projects, settings, and more with CodeFuse.",
};

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
