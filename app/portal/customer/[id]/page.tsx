"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon, SearchIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { getCustomerByIdAction } from "@/lib/actions/customer.actions";
import { redirect, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Customer } from "@/lib/model/customer.model";
import Link from "next/link";
import { CustomerMeasurements } from "@/components/customer/measurements";
import { Order } from "@/lib/model/order.model";
import { getOrdersByCustomerIdAction } from "@/lib/actions/order.actions";
import OrderList from "@/components/order-list";
import OrderListMobile from "@/components/order-list-mobile";

export default function ViewCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      const result = await getCustomerByIdAction(id as string);

      if (!result) {
        toast.error("لم يتم العثور على الزبون");
        redirect("/portal/customer");
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [id]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!id) return;

      const result = await getOrdersByCustomerIdAction(id as string);

      if (!result) {
        return;
      }

      setOrders(result);
    };
    fetchOrders();
  }, [id]);

  if (customer === null || orders === null) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الزبون</h1>
        <Link href={`/portal/order/add?customerId=${customer.id}`}>
          <Button size="sm">
            <ShoppingCart className="w-4 h-4 ml-2" />
            طلب
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div
              key={"customer-" + customer.id}
              className="flex items-center justify-between space-x-4"
            >
              <Link
                href={`/portal/customer/${customer.id}`}
                className="flex items-center space-x-4 gap-2"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/public/${customer.id ?? 0 % 100}`}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="leading-none">{customer.name}</p>
                  <p className="text-muted-foreground">
                    {customer.phoneNumber}
                  </p>
                </div>
              </Link>
              <Button
                size="sm"
                onClick={() => {
                  redirect(`/portal/customer/${customer.id}/edit`);
                }}
                variant="outline"
              >
                <PencilIcon className="w-4 h-4 ml-2" />
                تعديل
              </Button>
            </div>

            <CustomerMeasurements customer={customer} />
          </div>
        </CardContent>
      </Card>

      {orders.length > 0 && (
        <>
          <h1 className="text-2xl font-bold"> الطلبات</h1>
          <Card>
            <CardHeader>
              <CardDescription>عرض جميع طلبات الزبون</CardDescription>
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
        </>
      )}
    </div>
  );
}
