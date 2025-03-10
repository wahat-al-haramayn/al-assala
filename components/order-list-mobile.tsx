"use client";

import { Order } from "@/lib/model/order.model";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
  ChevronDown,
  FolderOpenIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { PaginationComponent } from "./pagination";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
} from "./ui/alert-dialog";

export default function OrderListMobile({
  orders,
  onDelete,
}: {
  orders: Order[] | null;
  onDelete: (id: string) => void;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("orderPage")) || 1;
  const pageSize = 5;

  if (orders === null || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className=" text-muted-foreground">لا يوجد طلبات</p>
      </div>
    );
  }

  return (
    <>
      <Separator className="col-span-2 mb-8 bg-zinc-500" />
      {orders
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((order, index) => (
          <div key={"order-" + order.id} className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 col-span-2 items-center justify-between">
              <Label className="text-right text-muted-foreground">
                طلب رقم {order.id}
              </Label>
              <Button
                variant="outline"
                onClick={() => {
                  redirect(`/portal/order/${order.id}/edit`);
                }}
              >
                <PencilIcon className="w-4 h-4 ml-2" />
                تعديل
              </Button>
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
                        redirect(`/portal/order/${order.id}/edit`);
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
                      هذا العملية سوف تؤدي إلى حذف الطلب بشكل نهائي وإزالة
                      البيانات من خادمنا.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-end">
                    <AlertDialogCancel className="ml-2">
                      إلغاء
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete(order.id || "");
                      }}
                    >
                      موافق
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-right text-muted-foreground">الزبون</Label>
              <Link href={`/portal/customer/${order.customerId}`}>
                <Label className="flex items-center text-blue-700">
                  {order.customerPhone}
                  <UserIcon className="w-4 h-4 mr-1" />
                </Label>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-right text-muted-foreground">
                التاريخ
              </Label>
              <Label className="text-right">
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleDateString("ar-MA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </Label>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-right text-muted-foreground">
                المبلغ الكلي
              </Label>
              <Label className="text-right">{order.total}DH</Label>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-right text-muted-foreground">
                المبلغ المدفوع
              </Label>
              <Label className="text-right">{order.deposit}DH</Label>
              <Label
                className={`text-right ${
                  order.total - order.deposit < 0
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                ({order.total - order.deposit}DH)
              </Label>
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <Label className="text-right text-muted-foreground">
                التفاصيل
              </Label>
              <Label className="text-right">{order.notes}</Label>
            </div>

            {index !== orders.length - 1 && (
              <Separator className="col-span-2 my-8 bg-zinc-500" />
            )}
          </div>
        ))}
      {orders?.length && orders?.length > pageSize && (
        <PaginationComponent
          pageName="orderPage"
          pageCount={Math.ceil((orders?.length || 0) / pageSize)}
        />
      )}
    </>
  );
}
