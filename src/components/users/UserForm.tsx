"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import InputField from "../shared/InputField";
import SubmitButton from "../ui/SubmitButton";

const UserForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(errMsg);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/users");
        router.refresh();
      } else {
        const { message } = await res.json();
        setErrMsg(message);
      }
      setIsLoading(false);
    } catch (error: any) {
      setErrMsg(error);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-slate-50 p-5 py-7 items-center justify-center w-1/4 mx-auto flex-col">
      <div className="flex flex-col text-right w-full">
        <InputField
          label="ادخل الاسم"
          handleChange={handleChange}
          name="username"
          value={form.username}
        />
      </div>
      <div className="flex flex-col text-right w-full mt-5">
        <InputField
          label="ادخل الايميل"
          handleChange={handleChange}
          name="email"
          value={form.email}
          type="email"
        />
      </div>
      <SubmitButton text=" إضافة" loader={isLoading} />
      {errMsg && <p className="text-red-500 mt-3">{errMsg}</p>}
    </form>
  );
};
export default UserForm;
