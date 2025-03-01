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

export default function Today({
  customers,
  orders,
}: {
  customers: Customer[];
  orders: Order[];
}) {
  return (
    <Card className="flex flex-col gap-4 ">
      <CardHeader>
        <CardTitle> أعمال اليوم </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">زبائن اليوم</p>
            <Button size="sm" onClick={() => redirect("/portal/customer/add")}>
              <PlusIcon className="w-4 h-4 ml-2" />
              إضافة زبون
            </Button>
          </div>
          <CustomerList customers={customers} />

          <Separator />
          <p className="text-muted-foreground">الطلبات المنفذة اليوم</p>
          <OrderList orders={orders} />
        </div>
      </CardContent>
    </Card>
  );
}
