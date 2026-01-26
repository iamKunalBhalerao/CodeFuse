"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/store/auth.store";
import ProfileDropDown from "./ProfileDropDown";

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <header>
        <div className="relative w-full flex items-center justify-center">
          <nav className="fixed top-5 bg-background border border-border shadow-sm inset-x-0 max-w-5xl mx-auto rounded-xl px-4 md:px-6 py-2 z-50 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl text-shadow-white text-shadow-lg/30 font-semibold text-foreground"
            >
              <span className="text-2xl text-primary">C</span>ode
              <span className="text-2xl text-primary">F</span>use
            </Link>
            <div className="flex gap-6 items-center">
              <div className="flex gap-4 text-muted-foreground">
                <Link
                  href="#home"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#solution"
                  className="hover:text-foreground transition-colors"
                >
                  Solution
                </Link>
                {/* <Link
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link> */}
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </div>
              <ThemeToggle />
              <div className="flex gap-2">
                {isAuthenticated ? (
                  // <Button asChild size="lg">
                  //   <Link href="/dashboard">
                  //     <span className="btn-label">DashBoard</span>
                  //   </Link>
                  // </Button>
                  <ProfileDropDown />
                ) : (
                  <>
                    <Button variant={"outline"} asChild size="lg">
                      <Link href="/auth/signup">
                        <span className="btn-label">Sign Up</span>
                      </Link>
                    </Button>
                    <Button asChild size="lg">
                      <Link href="/auth/signin">
                        <span className="btn-label">Sign In</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
