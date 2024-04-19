import Title from "@/components/shared/Title";
import UserForm from "@/components/users/UserForm";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const AddUser = async() => {  
  const session = await getSession();
  if (!session.isLoggedIn || !session.isAdmin) {
    redirect("/"); 
  }
  return (
    <>
      <Title text="إضافة مستخدم جديد" />
      <UserForm />
    </>
  );
};

export default AddUser;
