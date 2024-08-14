"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, User, UserIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import logout from "@/app/(auth)/logout/logoutAction";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
  const { theme, systemTheme } = useTheme();
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      router.push("/login");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-5 w-5">
            <AvatarImage src="" />
            <AvatarFallback className="bg-transparent">RP</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/login"
            className="flex items-center gap-2 w-full h-full"
            prefetch={false}
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4" />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
