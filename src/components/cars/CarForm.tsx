"use client";
import React, { useState } from "react";
import InputField from "../shared/InputField";
import { useRouter } from "next/navigation";
import SubmitButton from "../ui/SubmitButton";

const CarForm = () => {
  const [form, setForm] = useState({
    driverName: "",
    carNumber: "",
    carColor: "",
    establishedDateCar: "",
    carType: "",
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
      const res = await fetch(`/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setIsLoading(false);
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
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
      <SubmitButton loader={isLoading} text="تأكيد" />
    </form>
  );
};

export default CarForm;
