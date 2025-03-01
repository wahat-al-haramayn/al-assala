"use client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerList from "@/components/customer/customer-list";
import { Separator } from "@/components/ui/separator";
import OrderList from "@/components/order-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Order } from "@/lib/model/order.model";
import { Customer } from "@/lib/model/customer.model";
import OrderListMobile from "@/components/order-list-mobile";

export default function Today({
  customers,
  orders,
}: {
  customers: Customer[];
  orders: Order[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">أعمال اليوم</h1>
      <Card className="flex flex-col gap-4 ">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-lg">زبائن اليوم</p>
              <Button
                size="sm"
                onClick={() => redirect("/portal/customer/add")}
              >
                <PlusIcon className="w-4 h-4 ml-2" />
                إضافة زبون
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CustomerList customers={customers} />
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col gap-4 ">
        <CardHeader>
          <CardTitle>
            <p className="text-muted-foreground  text-lg">
              الطلبات المنفذة اليوم
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <OrderList orders={orders} />
          </div>
          <div className="block md:hidden">
            <OrderListMobile orders={orders} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
