import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  CreditCardIcon,
  LogOutIcon,
  Merge,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";

export default function ProfileDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard"}>
            <DropdownMenuItem>
              <CreditCardIcon />
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href={"/create-room"}>
            <DropdownMenuItem>
              <SquarePlus />
              Create Room
            </DropdownMenuItem>
          </Link>
          <Link href={"/join-room"}>
            <DropdownMenuItem>
              <Merge />
              Join Room
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
