import Title from "@/components/shared/Title";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";

const getStatitcs = async () => {
  try {
    const response = await fetch(
      `${process.env.WEBSITE_URL}/api/cars/statistics`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};
const Statistics = async () => {
  const {
    statistics: {
      carsInLast24Hours,
      carsInLastMonth,
      carsWithDayLeftZero,
      totalCars,
    },
  } = await getStatitcs();
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="flex flex-col px-12 ">
      <Title text="إحصائيات السيارات المؤجرة" />
      <div className="grid grid-cols-2 gap-4 mt-12">
        <CarCard title="آخر 24 ساعة" text={carsInLast24Hours} />
        <CarCard title="آخر الشهر" text={carsInLastMonth} />
        <CarCard
          title="عدد السيارات المنتهي مدتها"
          text={carsWithDayLeftZero}
        />
        <CarCard title="عدد السيارات" text={totalCars} />
      </div>
    </div>
  );
};

export default Statistics;
const CarCard = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-md h-[`120px] text-center">
      <h2 className="text-xl font-bold text-main"> {title}</h2>
      <p className="text-2xl font-bold">{text}</p>
    </div>
  );
};
