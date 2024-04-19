import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4">404 - الصفحة غير موجودة</h1>
      <p className="text-lg mb-8">
        الصفحة  التي تبحث عنها غير موجودة
      </p>
      <Link href="/" className="text-mainfont-semibold">
          عد إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
