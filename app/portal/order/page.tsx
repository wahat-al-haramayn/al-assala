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
import { PencilIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
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
import { Order } from "@/lib/model/order.model";
import {
  getOrdersAction,
  searchOrdersAction,
} from "@/lib/actions/order.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import OrderList from "@/components/order-list";
import OrderListMobile from "@/components/order-list-mobile";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [searchOrders, setSearchOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const orders = await getOrdersAction();
      setOrders(orders);
      setSearchOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleSearch = async (search: string) => {
    if (search.length === 0) {
      clearSearch();
      return;
    }

    setLoading(true);
    const result = await searchOrdersAction(search);
    setSearchOrders(result);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchOrders(orders);
    setLoading(false);
  };

  if (orders === null) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 ">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 gap-2">
            <Input
              placeholder="ابحث عن طلب بالملاحظات"
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(search);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              size="sm"
              variant="secondary"
              className="shrink-0"
              onClick={() => handleSearch(search)}
            >
              <SearchIcon className="w-4 h-4 ml-2" /> بحث
            </Button>

            <Button
              size="sm"
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
                <div className="flex justify-center items-center w-full">
                  <Loading />
                </div>
              ) : (
                <>
                  <div className="hidden md:block">
                    <OrderList orders={searchOrders} />
                  </div>
                  <div className="block md:hidden">
                    <OrderListMobile orders={searchOrders} />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
