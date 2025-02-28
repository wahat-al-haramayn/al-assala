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
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { getCustomerByIdAction } from "@/lib/actions/customer.actions";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Customer } from "@/lib/model/customer.model";
import Link from "next/link";
export default function ViewCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

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

  if (customer === null) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 min-w-[30rem]">
      <Card>
        <CardHeader>
          <CardTitle>الزبون</CardTitle>
        </CardHeader>
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
                  <p className="text-sm font-medium leading-none">
                    {customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.phoneNumber}
                  </p>
                </div>
              </Link>
              <Button
                onClick={() => {
                  redirect(`/portal/customer/${customer.id}/edit`);
                }}
                variant="outline"
              >
                تعديل
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <Label className="bg-card px-2 text-muted-foreground">
                  القياسات
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-2">
                <Label>الكتف</Label>:
                <Label>{customer.measurement.shoulder}</Label>
              </div>

              <div className="flex gap-2">
                <Label>المادة</Label>:
                <Label>{customer.measurement.matter}</Label>
              </div>

              <div className="flex gap-2">
                <Label>الربع</Label>:
                <Label>{customer.measurement.quarter}</Label>
              </div>

              <div className="flex gap-2">
                <Label>الطول</Label>:
                <Label>{customer.measurement.length}</Label>
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

              <div className="flex gap-2">
                <Label>الطول</Label>:
                <Label>{customer.measurement.pantLength}</Label>
              </div>

              <div className="flex gap-2">
                <Label>العرض</Label>:
                <Label>{customer.measurement.pantWidth}</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
