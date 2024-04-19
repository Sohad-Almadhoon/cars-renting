import ListUsers from "@/components/users/ListUsers";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";
import Loader from "../loading";
async function getUsersData() {
  try {
    const res = await fetch(`${process.env.WEBSITE_URL}/api/users`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching data...");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
const ShowUsers = async () => {
  const session = await getSession();
  if (!session.isLoggedIn || !session.isAdmin) {
    redirect("/");
  }
  const { data } = await getUsersData();
  if (!data.length) return <p>No data has fetched...</p>;
  return <ListUsers data={data} />;
};

export default ShowUsers;
