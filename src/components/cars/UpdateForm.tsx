"use client";
import React, { useState } from "react";
import InputField from "../shared/InputField";
import { useRouter } from "next/navigation";
import { FormDataTypes } from "../../app/types";
import SubmitButton from "../ui/SubmitButton";
type UpdateFormProps = {
  id: string;
  data: FormDataTypes;
};
const UpdateForm = ({ id, data }: UpdateFormProps) => {
  const [form, setForm] = useState({
    driverName: data.driverName || "",
    carNumber: data.carNumber || "",
    carColor: data.carColor || "",
    establishedDateCar: data.establishedDateCar || "",
    carType: data.carType || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed to updated the car");
      }
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        value={form.driverName}
        label="اسم السائق"
        name="driverName"
        handleChange={handleChange}
      />
      <InputField
        value={form.carNumber}
        label="رقم السيارة"
        name="carNumber"
        handleChange={handleChange}
      />
      <InputField
        value={form.carColor}
        label="لون السيارة"
        name="carColor"
        handleChange={handleChange}
      />
      <InputField
        value={form.carType}
        label="نوع السيارة"
        name="carType"
        handleChange={handleChange}
      />
      <InputField
        value={form.establishedDateCar}
        label="سنة صنع السيارة"
        name="establishedDateCar"
        handleChange={handleChange}
      />
      <SubmitButton text="تأكيد" loader={isLoading} />
    </form>
  );
};

export default UpdateForm;
