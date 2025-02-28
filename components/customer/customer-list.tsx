"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { CustomerAvatar } from "./avatar";
import { Customer } from "@/lib/model/customer.model";
import { PencilIcon } from "lucide-react";
export default function CustomerList({
  customers,
}: {
  customers: Customer[] | null;
}) {
  if (!customers || customers.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-muted-foreground">لا يوجد زبائن</p>
      </div>
    );

  return customers?.map((customer) => (
    <div
      key={"customer-" + customer.id}
      className="flex items-center justify-between space-x-4"
    >
      <CustomerAvatar customer={customer} />
      <Button
        onClick={() => {
          redirect(`/portal/customer/${customer.id}/edit`);
        }}
        variant="outline"
      >
        <PencilIcon className="w-4 h-4 ml-2" />
        تعديل
      </Button>
    </div>
  ));
}
