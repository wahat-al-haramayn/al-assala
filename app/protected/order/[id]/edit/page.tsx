"use client";

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
import {
  addCustomerAction,
  getCustomerByIdAction,
  updateCustomerAction,
} from "@/lib/actions/customer.actions";
import { Customer } from "@/lib/model/customer.model";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      const result = await getCustomerByIdAction(id as string);

      if (!result) {
        toast.error("لم يتم العثور على الزبون");
        redirect("/protected/customer");
      }

      setCustomer(result);
      reset(result);
    };

    fetchCustomer();
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>();

  const onSubmit = async (data: Customer) => {
    console.log(data);
    const customer = { ...data };
    const result = await updateCustomerAction(id as string, customer);

    if (!result) {
      toast.error("حدث خطأ أثناء تعديل الزبون");
      return;
    }

    toast.success("تم تعديل الزبون بنجاح");
    redirect("/protected/customer");
  };

  if (!customer) {
    return <Loading className="w-10 h-10" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>تعديل الزبون</CardTitle>
          <CardDescription>يمكنك تعديل الزبون هنا</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">رقم الهاتف</Label>
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
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>تعديل</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
