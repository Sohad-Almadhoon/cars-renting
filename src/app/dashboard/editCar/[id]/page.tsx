import UpdateForm from "@/components/cars/UpdateForm";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";
const getCarInfo = async (id: string) => {
  try {
    const res = await fetch(`${process.env.WEBSITE_URL}/api/cars/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch car...");
    }
    return res.json();
  } catch (error) {
    console.log(error)
  }
};
const EditCar = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session.isLoggedIn || !session.isAdmin) {
    redirect("/");
  }
  const { car } = await getCarInfo(id);
  return (
    <div className="my-8 max-w-lg mx-auto bg-slate-50 rounded-md px-8 py-9">
      <UpdateForm id={id} data={car} />
    </div>
  );
};

export default EditCar;
