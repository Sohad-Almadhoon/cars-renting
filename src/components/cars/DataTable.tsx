"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "../ui/Button";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <>
      <div className="flex justify-center mb-5">
        <input
          placeholder="ابحث عن طريق الاسم"
          value={
            (table.getColumn("driverName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("driverName")?.setFilterValue(event.target.value)
          }
          className="w-[450px] h-[35px] p-2 outline-none bg-white border-main border-b pb-3 rounded-sm"
        />
      </div>
      <Table className="rounded-md border-2">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    textAlign: "right",
                    color: "#008080",
                    fontSize: "17px",
                  }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      textAlign: "right",
                      color: "#666",
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                لا يوجد نتائج
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-5">
          {" "}
          <Button
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ArrowBigRightIcon className="size-5" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ArrowBigLeftIcon className="size-5" aria-hidden="true" />
          </Button>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center justify-center text-sm font-medium">
            الصفحة {table.getState().pagination.pageIndex + 1} من{" "}
            {table.getPageCount()}
          </div>
          <button
            aria-label="Go to first page"
            className="cursor-pointer text-sm text-slate-600"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            اذهب للصفحة الأولى
          </button>
          <button
            aria-label="Go to last page"
            className="cursor-pointer text-sm text-slate-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            اذهب للصفحة الأخيرة
          </button>
        </div>
      </div>
    </>
  );
}
