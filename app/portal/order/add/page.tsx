"use client";

import { CustomerAvatar } from "@/components/customer/avatar";
import { CustomerMeasurements } from "@/components/customer/measurements";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
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
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Usage: App router

export default function AddOrderSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <AddOrder />
    </Suspense>
  );
}

function AddOrder() {
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
        redirect("/portal/customer");
      }

      const result = await getCustomerByIdAction(customerId as string);

      if (!result) {
        toast.error("لم يتم العثور على الزبون");
        redirect("/portal/customer");
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [customerId]);

  const onSubmit = async (data: Order) => {
    const order = {
      ...data,
      customerId: customerId as string,
      customerPhone: customer?.phoneNumber as string,
    };

    const result = await addOrderAction(order);
    if (!result) {
      toast.error("حدث خطأ أثناء إضافة الطلب");
    }
    toast.success("تم إضافة الطلب بنجاح");
    redirect(`/portal/customer/${customerId}`);
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
              rows={6}
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
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">أضف</Button>
          <Button
            type="button"
            className="mr-2"
            variant="outline"
            onClick={() => redirect(`/portal/customer/${customerId}`)}
          >
            إلغاء
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
