"use client";

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
  getCustomerByPhoneNumberAction,
} from "@/lib/actions/customer.actions";
import { Customer } from "@/lib/model/customer.model";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  const onSubmit = async (data: Customer) => {
    const customerQuery = await getCustomerByPhoneNumberAction(
      data.phoneNumber
    );

    if (customerQuery) {
      toast.error("الرقم المدخل مستخدم من قبل زبون آخر");
      return;
    }

    const customer = { ...data };
    const result = await addCustomerAction(customer);

    if (!result) {
      toast.error("حدث خطأ أثناء إضافة الزبون");
      return;
    }

    toast.success("تم إضافة الزبون بنجاح");
    redirect("/portal/customer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>زبون جديد</CardTitle>
          <CardDescription>يمكنك إضافة زبون جديد هنا</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="phoneNumber">رقم الهاتف</Label>
            <Input
              dir="ltr"
              id="phoneNumber"
              type="phone"
              className={`${errors.phoneNumber ? "border-red-500" : ""}`}
              placeholder="0606060606"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "رقم الهاتف يجب أن يكون 10 أرقام (مثل: 0610203040)",
                },
              })}
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-xs mt-4">
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
                dir="ltr"
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
                dir="ltr"
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
                dir="ltr"
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
                dir="ltr"
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
                dir="ltr"
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
                dir="ltr"
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
          <Button type="submit">أضف</Button>
          <Button
            type="button"
            className="mr-2"
            variant="outline"
            onClick={() => redirect("/portal/customer")}
          >
            إلغاء
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
