import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { FollowerPointerCard } from "./ui/following-pointer";

export default function FeatureInfoSection() {
  return (
    <>
      <section className="overflow-hidden py-16 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-semibold lg:text-5xl">
              Built for Scaling teams
            </h2>
            <p className="mt-6 text-lg">
              Empower your team with workflows that scale as you grow. Whether
              you prefer Git-based synchronization or AI-driven automation,
              CodeFuse adapts to how your team actually works.
            </p>
          </div>
          <div className="mask-b-from-75% mask-l-from-75% mask-b-to-95% mask-l-to-95% relative -mx-4 pr-3 pt-3 md:-mx-12">
            <div className="perspective-midrange">
              <div className="rotate-x-6 -skew-2">
                <div className="aspect-88/36 relative">
                  <FollowerPointerCard
                    title={
                      <TitleComponent
                        title={blogContent.author}
                        avatar={blogContent.authorAvatar}
                      />
                    }
                  >
                    <Image
                      src="/FeatureInfo.png"
                      className="hidden dark:block"
                      alt="payments illustration dark"
                      width={2797}
                      height={1137}
                    />
                    <Image
                      src="/FeatureInfo.png"
                      className="dark:hidden"
                      alt="payments illustration light"
                      width={2797}
                      height={1137}
                    />
                  </FollowerPointerCard>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="size-4" />
                <h3 className="text-sm font-medium">Fast</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Built for speed from the ground up. Instant updates, real-time
                collaboration, and zero waiting around for tools to catch up.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="size-4" />
                <h3 className="text-sm font-medium">Powerful</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Everything you need to build, test, and iterate in one place.
                Designed to handle complex workflows without slowing developers
                down.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="size-4" />
                <h3 className="text-sm font-medium">Secure</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Enterprise-grade security baked in by default. Your code, data,
                and workflows stay protected at every step.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />

                <h3 className="text-sm font-medium">AI Powered</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                It supports an helping developers businesses innovate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Kunal",
  date: "26th Jan, 2026",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/Profile.png",
  authorAvatar: "/Profile.png",
};

export const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
