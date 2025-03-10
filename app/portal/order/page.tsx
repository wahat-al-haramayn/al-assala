'use client';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { deleteOrderAction, getOrdersAction, searchOrdersAction } from '@/lib/actions/order.actions';
import { Order } from '@/lib/model/order.model';

import OrderList from '@/components/order-list';
import OrderListMobile from '@/components/order-list-mobile';
import toast from 'react-hot-toast';

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [searchOrders, setSearchOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showClearSearchButton, setShowClearSearchButton] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const orders = await getOrdersAction();
      setOrders(orders);
      setSearchOrders(orders);
      setLoading(false);
      setShowClearSearchButton(false);
    };
    fetchOrders();
  }, []);

  const handleSearch = async (search: string) => {
    if (search.length === 0) {
      clearSearch();
      return;
    }

    setLoading(true);
    setShowClearSearchButton(true);
    const result = await searchOrdersAction(search);
    setSearchOrders(result);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearch('');
    setShowClearSearchButton(false);
    setSearchOrders(orders);
    setLoading(false);
  };

  const handleOnDelete = async (id: string) => {
    const result = await deleteOrderAction(id);
    if (result) {
      toast.success('تم حذف الطلب بنجاح');
      setSearchOrders(searchOrders?.filter((order) => order.id !== id) || null);
      setOrders(orders?.filter((order) => order.id !== id) || null);
    } else {
      toast.error('حدث خطأ ما أثناء حذف الطلب');
    }
  };

  if (orders === null) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4  w-full">
      <h1 className="text-2xl font-bold">الطلبات</h1>

      <Card>
        <CardHeader>
          <CardDescription>عرض جميع طلباتك أو البحث عن طلب بالتفاصيل</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 gap-2 ">
            <Input
              placeholder="ابحث عن طلب بالتفاصيل"
              value={search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(search);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            {showClearSearchButton ? (
              <Button size="sm" variant="ghost" className="shrink-0 " onClick={() => clearSearch()}>
                <XIcon className="w-4 h-4 ml-2" /> مسح
              </Button>
            ) : (
              <Button size="sm" variant="secondary" className="shrink-0" onClick={() => handleSearch(search)}>
                <SearchIcon className="w-4 h-4 ml-2" /> بحث
              </Button>
            )}
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
                    <OrderList orders={searchOrders} onDelete={handleOnDelete} />
                  </div>
                  <div className="block md:hidden">
                    <OrderListMobile orders={searchOrders} onDelete={handleOnDelete} />
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
