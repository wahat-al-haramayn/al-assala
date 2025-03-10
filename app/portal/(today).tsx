"use client";

import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerList from "@/components/customer/customer-list";
import OrderList from "@/components/order-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Order } from "@/lib/model/order.model";
import { Customer } from "@/lib/model/customer.model";
import OrderListMobile from "@/components/order-list-mobile";
import { deleteCustomerAction } from "@/lib/actions/customer.actions";
import { deleteOrderAction } from "@/lib/actions/order.actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Today({
  customers,
  orders,
}: {
  customers: Customer[];
  orders: Order[];
}) {
  const [loadedCustomers, setLoadedCustomers] = useState<Customer[]>([]);
  const [loadedOrders, setLoadedOrders] = useState<Order[]>([]);

  useEffect(() => {
    setLoadedCustomers(customers);
    setLoadedOrders(orders);
  }, [customers, orders]);

  const handleOnCustomerDelete = async (id: string) => {
    const result = await deleteCustomerAction(id);
    if (result) {
      toast.success("تم حذف الزبون بنجاح");
      setLoadedCustomers(
        loadedCustomers.filter((customer) => customer.id !== id)
      );
    } else {
      toast.error("حدث خطأ ما أثناء حذف الزبون");
    }
  };

  const handleOnOrderDelete = async (id: string) => {
    const result = await deleteOrderAction(id);
    if (result) {
      toast.success("تم حذف الطلب بنجاح");
      setLoadedOrders(loadedOrders.filter((order) => order.id !== id));
    } else {
      toast.error("حدث خطأ ما أثناء حذف الطلب");
    }
  };

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
            <CustomerList
              customers={loadedCustomers}
              onDelete={handleOnCustomerDelete}
            />
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
            <OrderList orders={loadedOrders} onDelete={handleOnOrderDelete} />
          </div>
          <div className="block md:hidden">
            <OrderListMobile
              orders={loadedOrders}
              onDelete={handleOnOrderDelete}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
