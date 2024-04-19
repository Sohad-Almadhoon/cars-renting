import Title from "@/components/shared/Title";
import { LoginForm } from "@/components/users/LoginForm";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const Login = async() => {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center my-6 h-[75%]">
      <div className=" w-1/2 text-center mx-auto p-5">
        <Title text="تسجيل الدخول" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
