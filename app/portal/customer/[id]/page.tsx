'use client';

import { CustomerMeasurements } from '@/components/customer/measurements';
import Loading from '@/components/loading';
import OrderList from '@/components/order-list';
import OrderListMobile from '@/components/order-list-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { getCustomerByIdAction } from '@/lib/actions/customer.actions';
import { deleteOrderAction, getOrdersByCustomerIdAction } from '@/lib/actions/order.actions';
import { Customer } from '@/lib/model/customer.model';
import { Order } from '@/lib/model/order.model';
import { PencilIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ViewCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const handleOnOrderDelete = async (id: string) => {
    const result = await deleteOrderAction(id);
    if (result) {
      toast.success('تم حذف الطلب بنجاح');
      setOrders(orders?.filter((order) => order.id !== id) ?? null);
    } else {
      toast.error('حدث خطأ ما أثناء حذف الطلب');
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      const result = await getCustomerByIdAction(id as string);

      if (!result) {
        toast.error('لم يتم العثور على الزبون');
        redirect('/portal/customer');
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [id]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!id) return;

      const result = await getOrdersByCustomerIdAction(id as string);

      if (!result) {
        return;
      }

      setOrders(result);
    };
    fetchOrders();
  }, [id]);

  if (customer === null || orders === null) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الزبون</h1>
        <Link href={`/portal/order/add?customerId=${customer.id}`}>
          <Button size="sm">
            <ShoppingCart className="w-4 h-4 ml-2" />
            طلب
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div key={'customer-' + customer.id} className="flex items-center justify-between space-x-4">
              <Link href={`/portal/customer/${customer.id}`} className="flex items-center space-x-4 gap-2">
                <Avatar>
                  <AvatarImage src={`https://avatar.iran.liara.run/public/${customer.id ?? 0 % 100}`} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="leading-none">{customer.name}</p>
                  <p className="text-muted-foreground">{customer.phoneNumber}</p>
                </div>
              </Link>
              <Button
                size="sm"
                onClick={() => {
                  redirect(`/portal/customer/${customer.id}/edit`);
                }}
                variant="outline"
              >
                <PencilIcon className="w-4 h-4 ml-2" />
                تعديل
              </Button>
            </div>

            <CustomerMeasurements customer={customer} />
          </div>
        </CardContent>
      </Card>

      {orders.length > 0 && (
        <>
          <h1 className="text-2xl font-bold"> الطلبات</h1>
          <Card>
            <CardHeader>
              <CardDescription>عرض جميع طلبات الزبون</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block">
                <OrderList orders={orders} onDelete={handleOnOrderDelete} />
              </div>
              <div className="block md:hidden">
                <OrderListMobile orders={orders} onDelete={handleOnOrderDelete} />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
