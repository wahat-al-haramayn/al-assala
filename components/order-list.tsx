"use client";

import { PencilIcon } from "lucide-react";

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

export default function OrderList({ orders }: { orders: Order[] | null }) {
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
          <TableHead className="text-right">الملاحظات</TableHead>
          <TableHead className="text-right"> التاريخ </TableHead>
          <TableHead className="text-right"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={"order-" + order.id}>
            <TableCell>
              <Link href={`/portal/customer/${order.customerId}`}>
                {order.customerPhone}
              </Link>
            </TableCell>
            <TableCell>{order.total - order.deposit}DH</TableCell>
            <TableCell className="max-w-xs wrap">{order.notes}</TableCell>
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
              <Button
                variant="outline"
                onClick={() => {
                  redirect(`/portal/order/${order.id}/edit`);
                }}
              >
                <PencilIcon className="w-4 h-4 ml-2" />
                تعديل
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
