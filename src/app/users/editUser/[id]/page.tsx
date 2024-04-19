import Title from "@/components/shared/Title";
import EditUserForm from "@/components/users/EditUserForm";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";
const getUserInfo = async (id: string) => {
  try {
    const res = await fetch(`${process.env.WEBSITE_URL}/api/users/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user...");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const EditUser = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session.isLoggedIn || !session.isAdmin) {
    redirect("/");
  }
  const { user } = await getUserInfo(id);
  return (
    <>
      <Title text="تعديل المستخدم" />
      <EditUserForm id={id} data={user} />
    </>
  );
};

export default EditUser;
