import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CreateRoomCard() {
  return (
    <>
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="bg-card mt-6 space-y-6">
            <div className="text-center">
              <h1 className="mb-1 mt-4 text-2xl font-semibold">Create Room</h1>
              <p className="text-sm">Create Room and start collaborating.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Room Name
              </Label>
              <Input
                type="room-name"
                required
                name="room-name"
                id="room-name"
                placeholder="example@example.com"
              />
            </div>

            <Button className="w-full cursor-pointer">Create Room</Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Join an Room ?
            <Button asChild variant="link" className="px-2">
              <Link href="/join-room">Join Room</Link>
            </Button>
          </p>
        </div>
      </form>
    </>
  );
}
