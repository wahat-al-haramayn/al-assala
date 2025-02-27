"use client";

import { CustomerAvatar } from "@/components/customer/avatar";
import { CustomerMeasurements } from "@/components/customer/measurements";
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
  getCustomerByPhoneNumberAction,
} from "@/lib/actions/customer.actions";
import { addOrderAction } from "@/lib/actions/order.actions";
import { Customer } from "@/lib/model/customer.model";
import { Order } from "@/lib/model/order.model";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AddOrder() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) {
        redirect("/protected/customer");
      }

      const result = await getCustomerByIdAction(customerId as string);

      if (!result) {
        toast.error("لم يتم العثور على الزبون");
        redirect("/protected/customer");
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [customerId]);

  const onSubmit = async (data: Order) => {
    const order = {
      ...data,
      customerId: customerId as string,
    };

    const result = await addOrderAction(order);
    if (!result) {
      toast.error("حدث خطأ أثناء إضافة الطلب");
    }
    toast.success("تم إضافة الطلب بنجاح");
    redirect("/protected/order");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="min-w-[30rem]">
        <CardHeader>
          <CardTitle>طلب جديد</CardTitle>
          <CardDescription>يمكنك إضافة طلب جديد هنا</CardDescription>
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
              id="deposit"
              placeholder="المبلغ المدفوع"
              className={`${errors.deposit ? "border-red-500" : ""}`}
              {...register("deposit", { required: true })}
            />

            <Label htmlFor="notes">تفاصيل الطلب</Label>
            <Textarea
              id="notes"
              placeholder="تفاصيل"
              className={`${errors.notes ? "border-red-500" : ""}`}
              {...register("notes", { required: true })}
            />

            <Label htmlFor="total">المبلغ الكلي</Label>
            <Input
              id="total"
              placeholder="المبلغ الكلي"
              className={`${errors.total ? "border-red-500" : ""}`}
              {...register("total", { required: true })}
            />

            {/*<Label htmlFor="name">رقم الهاتف</Label>
            <Input
              id="name"
              type="phone"
              className={`${errors.phoneNumber ? "border-red-500" : ""}`}
              placeholder="0664601048"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "رقم الهاتف يجب أن يكون 10 أرقام (مثل: 0610203040)",
                },
              })}
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-4">
                {errors.phoneNumber.message}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              placeholder="الاسم"
              className={`${errors.name ? "border-red-500" : ""}`}
              {...register("name", { required: true })}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                القياسات
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="shoulder">الكتف</Label>
              <Input
                id="shoulder"
                type="number"
                placeholder="0"
                className={`${errors.measurement?.shoulder ? "border-red-500" : ""}`}
                {...register("measurement.shoulder", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="matter">المادة</Label>
              <Input
                id="matter"
                type="number"
                placeholder="0"
                className={`${errors.measurement?.matter ? "border-red-500" : ""}`}
                {...register("measurement.matter", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="quarter">الربع</Label>
              <Input
                id="quarter"
                type="number"
                placeholder="0"
                className={`${errors.measurement?.quarter ? "border-red-500" : ""}`}
                {...register("measurement.quarter", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="length">الطول</Label>
              <Input
                id="length"
                placeholder="0"
                type="number"
                className={`${errors.measurement?.length ? "border-red-500" : ""}`}
                {...register("measurement.length", { required: true })}
              />
            </div>

            <div className="relative col-span-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  البنطلون
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="pantLength">الطول </Label>
              <Input
                id="pantLength"
                placeholder="0"
                type="number"
                className={`${errors.measurement?.pantLength ? "border-red-500" : ""}`}
                {...register("measurement.pantLength", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pantWidth">العرض </Label>
              <Input
                id="pantWidth"
                placeholder="0"
                type="number"
                className={`${errors.measurement?.pantWidth ? "border-red-500" : ""}`}
                {...register("measurement.pantWidth", { required: true })}
              />
            </div> */}
          </div>
        </CardContent>
        <CardFooter>
          <Button>أضف</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
