"use client";
import { UserDataProps } from "../../app/types";
import { Edit, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Title from "../shared/Title";

export default function ListUsers({ data }: any) {
  const router = useRouter();

  return (
    <div>
      <Title text="أسماء المستخدمين"/>
      <div className="px-16 p-5 rounded-md grid grid-cols-4 gap-4">
        {data.length &&
          data.map((ele: UserDataProps, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between mt-5 h-[120px] shadow-md bg-white p-3 rounded-md">
              <div className="flex flex-col">
                {" "}
                <span className="text-slate-700 text-md font-semibold">
                  {ele.username}
                </span>
                <span className="text-slate-500 text-md font-semibold">
                  {ele.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Edit
                  size={20}
                  color="green"
                  cursor="pointer"
                  onClick={() => {
                    router.push(`/users/editUser/${ele._id}`);
                  }}
                />
                <TrashIcon
                  size={22}
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    const isConfirm = confirm("هل انت متأكد انك تريد حذفه؟");

                    if (isConfirm) {
                      fetch(`/api/users/${ele._id}`, {
                        method: "DELETE",
                      })
                        .then((response) => {
                          if (response.ok) {
                            router.refresh();
                          }
                        })
                        .catch((error) => {
                          console.error("Error deleting user:", error);
                        });
                    }
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
