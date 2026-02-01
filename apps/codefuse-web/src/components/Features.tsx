import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe } from "lucide-react";
import Image from "next/image";
import { FollowerPointerCard } from "./ui/following-pointer";
import { blogContent, TitleComponent } from "./FeatureInfo";

export default function Features() {
  return (
    <>
      <section className="bg-muted/50 dark:bg-background py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto grid gap-2 sm:grid-cols-5">
            <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
              <CardHeader>
                <div className="md:p-6">
                  <p className="font-medium">Advanced tracking system</p>
                  <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                    Quick AI lives a single hotkey away - ready to quickly
                    appear as a floating window above your other apps..
                  </p>
                </div>
              </CardHeader>

              <div className="mask-b-from-75% mask-b-to-95% relative h-fit pl-6 md:pl-12">
                <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                  <FollowerPointerCard
                    title={
                      <TitleComponent
                        title={blogContent.author}
                        avatar={blogContent.authorAvatar}
                      />
                    }
                  >
                    <Image
                      src="/HeroImg.png"
                      className="hidden dark:block"
                      alt="payments illustration dark"
                      width={1207}
                      height={929}
                    />
                    <Image
                      src="/HeroImg.png"
                      className="shadow dark:hidden"
                      alt="payments illustration light"
                      width={1207}
                      height={929}
                    />
                  </FollowerPointerCard>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
              <p className="mx-auto my-6 max-w-md text-balance px-6 text-center text-lg font-semibold sm:text-2xl md:p-6">
                Advanced UX, Instantly locate all your assets.
              </p>

              <CardContent className="mt-auto h-fit">
                <div className="mask-radial-at-right mask-radial-from-75% mask-radial-[75%_75%] relative max-sm:mb-6">
                  <div className="aspect-76/59 overflow-hidden rounded-r-lg border">
                    <FollowerPointerCard
                      title={
                        <TitleComponent
                          title={blogContent.author}
                          avatar={blogContent.authorAvatar}
                        />
                      }
                    >
                      <Image
                        src="/feature2Dark.png"
                        className="hidden dark:block"
                        alt="payments illustration dark"
                        width={1207}
                        height={929}
                      />
                      <Image
                        src="/feature2Light.png"
                        className="shadow dark:hidden"
                        alt="payments illustration light"
                        width={1207}
                        height={929}
                      />
                    </FollowerPointerCard>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <div className="p-px w-full md:w-6xl mx-auto bg-gray-500/20 mt-5"></div>
    </>
  );
}
