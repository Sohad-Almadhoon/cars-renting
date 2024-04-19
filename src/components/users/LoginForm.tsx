"use client";
import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FormEvent, SetStateAction, useState } from "react";
import SubmitButton from "../ui/SubmitButton";
import InputField from "../shared/InputField";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (email: string) => {
    setIsLoading(true);

    try {
      const result = await login(email);

      if (result.error) {
        setError(result.error);
      } else {
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setError("حدث خطأ الرجاء المحاولة مرى أخرى");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(email);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[65%] mx-auto bg-slate-50 mt-5 p-5 rounded-md">
      <div className="mb-2">
        <label className="block text-md font-medium text-gray-700  text-right">
          الإيميل
        </label>
        <InputField
          type="email"
          name="email"
          value={email}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
          placeholder="ادخل ايميلك"
        />{" "}
      </div>
      <SubmitButton text="تسجيل الدخول" loader={isLoading} />
      {error && <p className="text-red-500 mt-3">{error}</p>}{" "}
    </form>
  );
}
