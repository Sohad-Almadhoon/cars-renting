"use client";
import { MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DropDown from "./DropDown";
import useSession from "@/app/useSession";

const Header = ({
  sidebar,
  setSidebar,
}: {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  return (
    <header className="bg-main py-5 flex items-center justify-between px-12 min-h-[60px]">
      {session?.isLoggedIn && (
        <>
          <MenuIcon
            color="white"
            size={30}
            onClick={() => setSidebar(!sidebar)}
            cursor="pointer"
          />
          <DropDown />
        </>
      )}
    </header>
  );
};

export default Header;
