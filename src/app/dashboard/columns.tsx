"use client";
import { FormDataTypes } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, PrinterIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useSession from "../useSession";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PrintComponent from "@/components/cars/PrintComponent";

const Btns = ({ id }: { id: string }) => {
  const router = useRouter();
  const session = useSession();
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "طباعة بيانات السيارة",
    content: () => componentRef.current,
  });
  return (
    <div className="flex gap-4 items-center">
      {session?.isAdmin && (
        <>
          {" "}
          <Edit
            size={20}
            color="green"
            cursor="pointer"
            onClick={() => {
              router.push(`/dashboard/editCar/${id}`);
              router.refresh();
            }}
          />
          <TrashIcon
            size={22}
            color="red"
            cursor="pointer"
            onClick={() => {
              const isConfirm = confirm("هل انت متأكد انك تريد حذفه؟");

              if (isConfirm) {
                fetch(`/api/cars/${id}`, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (response.ok) {
                      router.refresh();
                    }
                  })
                  .catch((error) => {
                    console.error("Error deleting car:", error);
                  });
              }
            }}
          />
        </>
      )}
      <PrintComponent ref={componentRef} id={id} />
      <PrinterIcon onClick={handlePrint} cursor="pointer" color="brown"/>
    </div>
  );
};

export const columns: ColumnDef<FormDataTypes>[] = [
  {
    accessorKey: "No",
    id: "id",
    header: "#",
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
  },
  {
    accessorKey: "driverName",
    header: ({ column }) => {
      return (
        <button
          className="flex gap-x-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          اسم السائق
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "carNumber",
    header: "رقم السيارة",
  },
  {
    accessorKey: "establishedDateCar",
    header: "تاريخ إصدار السيارة",
  },
  {
    accessorKey: "carColor",
    header: "لون السيارة",
  },
  {
    accessorKey: "carType",
    header: "نوع السيارة",
  },

  {
    accessorKey: "daysLeft",
    header: "الأيام المتبقية",
    cell: ({ table, row }) => {
      return (
        <span className="font-bold text-lg text-red-500">
          {row.original.daysLeft}
        </span>
      );
    },
  },
  {
    accessorKey: "btns",
    header: "",
    cell: ({ row }) => {
      const id = row.original._id;
      return <Btns id={id} />;
    },
  },
];
