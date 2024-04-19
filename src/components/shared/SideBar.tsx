import useSession from "@/app/useSession";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const session = useSession();
  return (
    <div className="p-5 text-slate-50 font-bold bg-main h-full w-[200px]">
      <Link href="/">
        {" "}
        <h1 className="text-2xl font-bold mb-12 flex gap-3 items-center">
          الرئيسية <HomeIcon size={35} />
        </h1>
      </Link>
      <div className="flex flex-col gap-y-5 mt-5">
        <Tab text="عرض بيانات السيارات" href="/dashboard" />
        <Tab text="إضافة سيارة جديدة" href="/dashboard/addCar" />
        <Tab text="الإحصائيات" href="/dashboard/statistics" />
        {session?.isAdmin && (
          <>
            <Tab text="إضافة مستخدم" href="/users/addUser" />
            <Tab text="عرض المستخدمين" href="/users" />
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
const Tab = ({href , text} : {href : string, text:string}) => {
  return (
    <Link
      href={href}
      className="hover:bg-slate-50  hover:text-main p-2 rounded-md">
      {text}
    </Link>
  );
}