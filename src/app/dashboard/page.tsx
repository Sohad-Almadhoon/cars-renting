
import { DataTable } from "@/components/cars/DataTable";
import React from "react";
import { columns } from "./columns";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

async function getCarsData() {
  try {
    const res = await fetch(`${process.env.WEBSITE_URL}/api/cars`, {
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

const Dashboard = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }
  const { data } = await getCarsData();
  if (!data.length) return <p>No data has fetched...</p>;

  return (
    <div className="bg-slate-100 px-12 py-16 h-full">
      {data.length && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Dashboard;
