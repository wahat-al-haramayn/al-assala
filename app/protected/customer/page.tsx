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
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Customer } from "@/lib/model/customer.model";
import Loading from "@/components/loading";
import {
  getCustomersAction,
  searchCustomersAction,
} from "@/lib/actions/customer.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CustomerAvatar } from "@/components/customer/avatar";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [searchCustomers, setSearchCustomers] = useState<Customer[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const customers = await getCustomersAction();
      setCustomers(customers);
      setSearchCustomers(customers);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleSearch = async (search: string) => {
    if (search.length === 0) {
      clearSearch();
      return;
    }

    setLoading(true);
    const result = await searchCustomersAction(search);
    setSearchCustomers(result);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchCustomers(customers);
    setLoading(false);
  };

  if (customers === null) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 min-w-[30rem]">
      <Card>
        <CardHeader>
          <CardTitle>الزبائن</CardTitle>
          <CardDescription>
            يمكنك إضافة زبون جديد أو تعديل زبون موجود
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 gap-2">
            <Input
              placeholder="ابحث عن زبون بالرقم الموبايل أو الاسم"
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(search);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="secondary"
              className="shrink-0"
              onClick={() => handleSearch(search)}
            >
              <SearchIcon className="w-4 h-4 ml-2" /> بحث
            </Button>

            <Button
              variant="outline"
              className="shrink-0 "
              onClick={() => clearSearch()}
            >
              <XIcon className="w-4 h-4 ml-2" /> مسح
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="grid gap-6">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loading />
                </div>
              ) : searchCustomers?.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-sm text-muted-foreground">لا يوجد زبائن</p>
                </div>
              ) : (
                searchCustomers?.map((customer) => (
                  <div
                    key={"customer-" + customer.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <CustomerAvatar customer={customer} />
                    <Button
                      onClick={() => {
                        redirect(`/protected/customer/${customer.id}/edit`);
                      }}
                      variant="outline"
                    >
                      تعديل
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
