"use client";
import { UserDataProps } from "../../app/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SubmitButton from "../ui/SubmitButton";
import InputField from "../shared/InputField";
type EditUserFormProps = {
  id: string;
  data: UserDataProps;
};
const EditUserForm = ({ id, data }: EditUserFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: data.username,
    email: data.email,
  });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed to updated the user");
      }
      setIsLoading(false);
      router.push("/users");
      router.refresh();
    } catch (error: any) {
      setErrMsg(error);
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-slate-50 p-5 py-7 items-center justify-center w-1/4 mx-auto flex-col">
      <div className="w-full">
        <InputField
          label="ادخل الاسم"
          handleChange={handleChange}
          name="username"
          value={form.username}
        />{" "}
        <InputField
          label="ادخل الايميل"
          handleChange={handleChange}
          name="email"
          value={form.email}
          type="email"
        />
      </div>

      <SubmitButton text="تحديث" loader={isLoading} />
      {errMsg && <p className="text-red-500">{errMsg}</p>}
    </form>
  );
};

export default EditUserForm;
