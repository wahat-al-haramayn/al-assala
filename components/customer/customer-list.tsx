"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { CustomerAvatar } from "./avatar";
import { Customer } from "@/lib/model/customer.model";
import { PencilIcon } from "lucide-react";
import { PaginationComponent } from "../pagination";

export default function CustomerList({
  customers,
}: {
  customers: Customer[] | null;
}) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("customerPage")) || 1;
  const pageSize = 5;

  if (!customers || customers.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-muted-foreground">لا يوجد زبائن</p>
      </div>
    );

  return (
    <>
      {customers
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((customer) => (
          <div
            key={"customer-" + customer.id}
            className="flex items-center justify-between space-x-4"
          >
            <CustomerAvatar customer={customer} />
            <Button
              size="sm"
              onClick={() => {
                redirect(`/portal/customer/${customer.id}/edit`);
              }}
              variant="ghost"
            >
              <PencilIcon className="w-4 h-4 ml-2" />
              تعديل
            </Button>
          </div>
        ))}
      {customers?.length && customers?.length > pageSize && (
        <PaginationComponent
          pageCount={Math.ceil((customers?.length || 0) / pageSize)}
          pageName="customerPage"
        />
      )}
    </>
  );
}
