"use client";

import { ChevronDown, PencilIcon, TrashIcon, UserIcon } from "lucide-react";

import { Order } from "@/lib/model/order.model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

export default function OrderList({
  orders,
  onDelete,
}: {
  orders: Order[] | null;
  onDelete: (id: string) => void;
}) {
  if (orders === null || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className=" text-muted-foreground">لا يوجد طلبات</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">رقم الزبون</TableHead>
          <TableHead className="text-right">المبلغ المتبقي</TableHead>
          <TableHead className="text-right">التفاصيل</TableHead>
          <TableHead className="text-right"> التاريخ </TableHead>
          <TableHead className="text-right"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={"order-" + order.id}>
            <TableCell>
              <Link href={`/portal/customer/${order.customerId}`}>
                <Label className="flex items-center text-blue-700">
                  {order.customerPhone}
                  <UserIcon className="w-4 h-4 mr-1" />
                </Label>
              </Link>
            </TableCell>
            <TableCell>{order.total - order.deposit}DH</TableCell>
            <TableCell width={175} className="wrap ">
              {order.notes}
            </TableCell>
            <TableCell>
              {order.orderDate
                ? new Date(order.orderDate).toLocaleDateString("ar-MA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
