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
import { SearchIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { getCustomerByIdAction } from "@/lib/actions/customer.actions";
import { redirect, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Customer } from "@/lib/model/customer.model";
import Link from "next/link";
import { CustomerMeasurements } from "@/components/customer/measurements";

export default function ViewCustomer() {
  const router = useRouter();
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
          <CardTitle className="flex items-center justify-between">
            الزبون
            <Link href={`/portal/order/add?customerId=${customer.id}`}>
              <Button>
                <ShoppingCart className="w-4 h-4 ml-2" />
                طلب
              </Button>
            </Link>
          </CardTitle>
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

            <CustomerMeasurements customer={customer} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
