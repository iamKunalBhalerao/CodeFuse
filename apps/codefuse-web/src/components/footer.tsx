import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

const enterpriseLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Customers" },
  { href: "#", label: "Enterprise" },
  { href: "#", label: "Partners" },
  { href: "#", label: "Jobs" },
];

const productLinks = [
  { href: "#", label: "Security" },
  { href: "#", label: "Customization" },
  { href: "#", label: "Enterprise" },
  { href: "#", label: "Partners" },
];

const docsLinks = [
  { href: "#", label: "Introduction" },
  { href: "#", label: "Installation" },
  { href: "#", label: "Utils" },
  { href: "#", label: "Principles" },
  { href: "#", label: "Jargon" },
  { href: "#", label: "Plugin" },
  { href: "#", label: "Customizer" },
  { href: "#", label: "Boilerplates" },
];

const communityLinks = [
  { href: "#", label: "GitHub" },
  { href: "#", label: "Discord" },
  { href: "#", label: "Slack" },
  { href: "#", label: "X / Twitter" },
];

const footerLinks = [
  {
    name: "Enterprise",
    links: enterpriseLinks,
  },
  {
    name: "Product",
    links: productLinks,
  },
  {
    name: "Docs",
    links: docsLinks,
  },
];

export default function Footer() {
  return (
    <footer className="m-1 rounded-3xl border">
      <div className="mx-auto max-w-5xl space-y-16 px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
          <Link
            href="/"
            className="text-xl text-shadow-white text-shadow-lg/30 font-semibold text-foreground"
          >
            <span className="text-2xl text-primary">C</span>ode
            <span className="text-2xl text-primary">F</span>use
          </Link>
          <div className="flex gap-3">
            <Link
              href="https://x.com/KUNAL_BHALERAO_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4"
                  color="currentColor"
                ></path>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/kunalbhaleraoo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                ></path>
              </svg>
            </Link>
            <Link
              href="linkedin.com/in/kunalbhalerao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground hover:text-primary block"
            >
<svg
  className="size-6"
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
>
  <path
    fill="currentColor"
    d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5M3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.8-2.05C20.5 8.65 22 10.5 22 13.2V21h-4v-6.8c0-1.6 0-3.7-2.3-3.7s-2.6 1.7-2.6 3.6V21h-4z"
  />
</svg>
            </Link>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {footerLinks.map((linksGroup, index) => (
            <div key={index}>
              <span className="font-medium">{linksGroup.name}</span>
              <ul className="mt-4 list-inside space-y-4">
                {linksGroup.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-primary text-muted-foreground text-sm duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span className="text-sm font-medium">Community</span>
            <ul className="mt-4 list-inside space-y-4">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-primary text-muted-foreground text-sm duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <form className="mt-12 w-full max-w-xs">
              <div className="space-y-2.5">
                <Label className="block text-sm font-medium" htmlFor="email">
                  Subscribe to our newsletter
                </Label>
                <Input
                  className="input variant-mixed sz-md"
                  placeholder="Your email"
                  type="email"
                  id="email"
                  required
                  name="email"
                />
              </div>
              <Button type="submit" className="mt-3">
                <span>Subscribe</span>
              </Button>
            </form>
          </div>
        </div> */}
        <div className="bg-muted mt-16 flex items-center justify-between rounded-md p-4 px-6 py-3">
          <span>&copy; Kunal 2026 - Present</span>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            Licence
          </Link>
        </div>
      </div>
    </footer>
  );
}
