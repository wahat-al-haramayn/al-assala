"use client";

import { CustomerAvatar } from "@/components/customer/avatar";
import { CustomerMeasurements } from "@/components/customer/measurements";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  addCustomerAction,
  getCustomerByIdAction,
  updateCustomerAction,
} from "@/lib/actions/customer.actions";
import {
  getOrderByIdAction,
  updateOrderAction,
} from "@/lib/actions/order.actions";
import { Customer } from "@/lib/model/customer.model";
import { Order } from "@/lib/model/order.model";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const result = await getOrderByIdAction(id as string);

      if (!result) {
        toast.error("لم يتم العثور على الطلب");
        redirect("/portal/order");
      }

      setOrder(result);
      reset(result);
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!order) {
        return;
      }

      const result = await getCustomerByIdAction(order?.customerId as string);

      if (!result) {
        toast.error("لم يتم العثور على الزبون");
        redirect("/portal/order");
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [order]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Order>();

  const onSubmit = async (data: Order) => {
    console.log(data);
    const order = { ...data };
    const result = await updateOrderAction(id as string, order);

    if (!result) {
      toast.error("حدث خطأ أثناء تعديل الطلب");
      return;
    }

    toast.success("تم تعديل الطلب بنجاح");
    redirect("/portal/order");
  };

  if (!order || !customer) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">تعديل الطلب</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardDescription>يمكنك تعديل الطلب هنا</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-x-2 gap-2">
              {customer && (
                <div className="flex flex-col gap-4">
                  <CustomerAvatar customer={customer} disabled={true} />
                  <CustomerMeasurements customer={customer} />
                </div>
              )}

              <Separator className="my-4" />

              <Label htmlFor="deposit">المبلغ المدفوع</Label>
              <Input
                dir="ltr"
                id="deposit"
                placeholder="المبلغ المدفوع"
                className={`${errors.deposit ? "border-red-500" : ""}`}
                {...register("deposit", { required: true })}
              />

              <Label htmlFor="notes">تفاصيل الطلب</Label>
              <Textarea
                rows={6}
                id="notes"
                placeholder="تفاصيل"
                className={`${errors.notes ? "border-red-500" : ""}`}
                {...register("notes", { required: true })}
              />

              <Label htmlFor="total">المبلغ الكلي</Label>
              <Input
                dir="ltr"
                id="total"
                placeholder="المبلغ الكلي"
                className={`${errors.total ? "border-red-500" : ""}`}
                {...register("total", { required: true })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">تعديل</Button>
            {/* <Button
              type="button"
              className="mr-2"
              variant="outline"
              onClick={() => redirect(`/portal/customer/${customer?.id}`)}
            >
              إلغاء
            </Button> */}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
