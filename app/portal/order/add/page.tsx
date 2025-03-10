'use client';

import { CustomerAvatar } from '@/components/customer/avatar';
import { CustomerMeasurements } from '@/components/customer/measurements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCustomerByIdAction } from '@/lib/actions/customer.actions';
import { addOrderAction } from '@/lib/actions/order.actions';
import { Customer } from '@/lib/model/customer.model';
import { Order } from '@/lib/model/order.model';
import { Loader2 } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function AddOrder() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customerId');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) {
        redirect('/portal/customer');
      }

      const result = await getCustomerByIdAction(customerId as string);

      if (!result) {
        toast.error('لم يتم العثور على الزبون');
        redirect('/portal/customer');
      }

      setCustomer(result);
    };

    fetchCustomer();
  }, [customerId]);

  const onSubmit = async (data: Order) => {
    setIsLoading(true);
    const order = {
      ...data,
      customerId: customerId as string,
      customerPhone: customer?.phoneNumber as string,
    };

    const result = await addOrderAction(order);
    if (!result) {
      toast.error('حدث خطأ أثناء إضافة الطلب');
    }
    toast.success('تم إضافة الطلب بنجاح');
    setIsLoading(false);
    redirect(`/portal/customer/${customerId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">طلب جديد</h1>
      </div>

      <Card>
        <CardHeader>
          <CardDescription>هذا الطلب ينتمي إلى الزبون</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-lg font-bold"> </h1>

          {customer && (
            <div className="flex flex-col gap-4">
              <CustomerAvatar customer={customer} disabled={true} />
              <CustomerMeasurements customer={customer} />
            </div>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardDescription>يمكنك إضافة طلب جديد هنا</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-x-2 gap-2">
              <Label htmlFor="deposit">المبلغ المدفوع</Label>
              <Input
                id="deposit"
                type="number"
                dir="ltr"
                placeholder="المبلغ المدفوع"
                className={`leading-[1.5] text-sm align-top p-3 h-12 ${errors.deposit ? 'border-red-500' : ''}`}
                {...register('deposit', { required: true })}
              />

              <Label htmlFor="notes">تفاصيل الطلب</Label>
              <Textarea
                id="notes"
                rows={6}
                placeholder="تفاصيل"
                className={`${errors.notes ? 'border-red-500' : ''}`}
                {...register('notes', { required: true })}
              />

              <Label htmlFor="total">المبلغ الكلي</Label>
              <Input
                id="total"
                type="number"
                dir="ltr"
                placeholder="المبلغ الكلي"
                className={`${errors.total ? 'border-red-500' : ''}`}
                {...register('total', { required: true })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              أضف
            </Button>
            {/* <Button
            type="button"
            className="mr-2"
            variant="outline"
            onClick={() => redirect(`/portal/customer/${customerId}`)}
          >
            إلغاء
          </Button> */}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
