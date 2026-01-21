import { Metadata } from "next";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Sign Up - CodeFuse",
  description:
    "Create an account to start collaborating on code with CodeFuse.",
};

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <section>
        <Link
          href="/"
          className="absolute top-4 left-4 px-4 py-2 rounded-2xl border flex gap-2 items-center group border-gray-200 cursor-pointer"
        >
          <FaArrowLeft /> Go Home
        </Link>
        {children}
      </section>
    </>
  );
}
