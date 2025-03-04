"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { CustomerAvatar } from "./avatar";
import { Customer } from "@/lib/model/customer.model";
import {
  ChevronDown,
  FolderOpenIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { PaginationComponent } from "../pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

export default function CustomerList({
  customers,
  onDelete,
}: {
  customers: Customer[] | null;
  onDelete: (id: string) => void;
}) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("customerPage")) || 1;
  const pageSize = 10;

  if (!customers || customers.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-muted-foreground">لا يوجد زبائن</p>
      </div>
    );

  return (
    <>
      {customers
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((customer) => (
          <div
            key={"customer-" + customer.id}
            className="flex items-center justify-between space-x-4"
          >
            <CustomerAvatar customer={customer} />
            <AlertDialog>
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="w-4 h-4 ml-2" />
                    العمليات
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex items-center justify-evenly"
                    onClick={() => {
                      redirect(`/portal/customer/${customer.id}`);
                    }}
                  >
                    <FolderOpenIcon className="w-4 h-4 " />
                    عرض
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center justify-evenly"
                    onClick={() => {
                      redirect(`/portal/customer/${customer.id}/edit`);
                    }}
                  >
                    <PencilIcon className="w-4 h-4 " />
                    تعديل
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-700 focus:text-red-700">
                    <AlertDialogTrigger className="flex items-center justify-evenly w-full">
                      <TrashIcon className="w-4 h-4 " />
                      حذف
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-700 flex ">
                    هل أنت متأكد ؟
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex items-right">
                    هذا العملية سوف تؤدي إلى حذف الزبون بشكل نهائي وإزالة
                    البيانات من خادمنا.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end">
                  <AlertDialogCancel className="ml-2">إلغاء</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(customer.id || "");
                    }}
                  >
                    موافق
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* <Select>
              <SelectTrigger className="w-[6rem]">
                <SelectValue placeholder="العملية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="View">عرض</SelectItem>
                <SelectItem value="Edit">تعديل</SelectItem>
                <SelectItem value="Delete">حذف</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        ))}
      {customers?.length && customers?.length > pageSize && (
        <PaginationComponent
          pageCount={Math.ceil((customers?.length || 0) / pageSize)}
          pageName="customerPage"
        />
      )}
    </>
  );
}
