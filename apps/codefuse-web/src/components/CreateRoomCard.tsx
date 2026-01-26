"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ClientEnv } from "@repo/env";

export default function CreateRoomCard() {
  const router = useRouter();
  const [formData, setFormData] = useState<{ roomName: string }>({
    roomName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${ClientEnv.NEXT_PUBLIC_CORE_API_URL}/v1/rooms/create`,
        {
          name: formData.roomName,
        },
        {
          withCredentials: true,
        }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to create room!");
      }

      setLoading(false);
      router.push(`/room/${data.room.id}`);
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Accessing the error message sent from the backend response body
        const backendMessage = err.response?.data?.message || err.response?.data?.error;
        setError(backendMessage || "Server error occurred");
      } 

      else if (err instanceof Error) {
        setError(err.message);
      } 
      else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
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
                placeholder="Room123"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, roomName: e.target.value })
                }
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Creating...." : "Create Room"}
            </Button>
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
