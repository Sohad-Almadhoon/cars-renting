import Car from "@/app/api/cars/model";
import Title from "@/components/shared/Title";
import { getSession } from "@/lib/actions";
import connectMongoDB from "@/lib/db";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const getStatistics = async () => {
  try {
    await connectMongoDB();
    const statistics = await Car.generateStatistics();
    return statistics;
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};
const Statistics = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }
  const statistics = await getStatistics();
  if (!statistics) {
    return <Loader />;
  }
  const carsInLast24Hours = statistics.carsInLast24Hours;
  const carsInLastMonth = statistics.carsInLastMonth;
  const carsWithDayLeftZero = statistics.carsWithDayLeftZero;
  const totalCars = statistics.totalCars;
  return (
    <div className="flex flex-col px-12 ">
      <Title text="إحصائيات السيارات المؤجرة" />
      <div className="grid grid-cols-2 gap-4 mt-12">
        <CarCard title="آخر 24 ساعة" number={carsInLast24Hours} />
        <CarCard title="آخر الشهر" number={carsInLastMonth} />
        <CarCard
          title="عدد السيارات المنتهي مدتها"
          number={carsWithDayLeftZero}
        />
        <CarCard title="عدد السيارات" number={totalCars} />
      </div>
    </div>
  );
};

export default Statistics;
const CarCard = ({ title, number }: { title: string; number: number }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-md h-[`120px] text-center">
      <h2 className="text-xl font-bold text-main"> {title}</h2>
      <p className="text-2xl font-bold">{number}</p>
    </div>
  );
};
