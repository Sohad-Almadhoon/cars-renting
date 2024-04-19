import CarForm from "@/components/cars/CarForm";
import Title from "@/components/shared/Title";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="max-w-md   mx-auto bg-slate-50 rounded-md p-3 px-5">
      <Title text="بيانات السيارة المؤجرة" />
      <CarForm />
    </div>
  );
}
