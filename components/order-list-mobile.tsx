"use client";

import { Order } from "@/lib/model/order.model";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { PhoneIcon, UserIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PaginationComponent } from "./pagination";

export default function OrderListMobile({
  orders,
}: {
  orders: Order[] | null;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("orderPage")) || 1;
  const pageSize = 2;

  if (orders === null || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
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
            <div className="flex flex-col gap-2 col-span-2">
              <Label className="text-right text-muted-foreground">
                طلب رقم {order.id}
              </Label>
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
