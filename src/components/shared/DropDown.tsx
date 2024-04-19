import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "../ui/Button";
import { logout } from "@/lib/actions";
import useSession from "@/app/useSession";

const DropDown = () => {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <span className="w-12 h-12 text-2xl font-bold bg-slate-50 text-main rounded-full flex justify-center items-center">
          {session?.email?.charAt(0).toUpperCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-5">
        <DropdownMenuItem className="text-main font-medium text-md w-full mx-auto">
         {session?.username}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={logout}>
            <Button>تسجيل الخروج</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
