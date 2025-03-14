'use client';

import CustomerList from '@/components/customer/customer-list';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { deleteCustomerAction, getCustomersAction, searchCustomersAction } from '@/lib/actions/customer.actions';
import { Customer } from '@/lib/model/customer.model';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [searchCustomers, setSearchCustomers] = useState<Customer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showClearSearchButton, setShowClearSearchButton] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const customers = await getCustomersAction();
      setCustomers(customers);
      setSearchCustomers(customers);
      setLoading(false);
      setShowClearSearchButton(false);
    };
    fetchCustomers();
  }, []);

  const handleSearch = async (search: string) => {
    if (search.length === 0) {
      clearSearch();
      return;
    }

    setShowClearSearchButton(true);
    setLoading(true);
    const result = await searchCustomersAction(search);
    setSearchCustomers(result);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearch('');
    setShowClearSearchButton(false);
    setSearchCustomers(customers);
    setLoading(false);
  };

  const handleOnDelete = async (id: string) => {
    const result = await deleteCustomerAction(id);
    if (result) {
      toast.success('تم حذف الزبون بنجاح');
      setSearchCustomers(searchCustomers?.filter((customer) => customer.id !== id) || null);
      setCustomers(customers?.filter((customer) => customer.id !== id) || null);
    } else {
      toast.error('حدث خطأ ما أثناء حذف الزبون');
    }
  };

  if (customers === null) {
    return (
      <div className="flex justify-center items-center w-full ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الزبائن</h1>
        <Button
          size="sm"
          onClick={() => {
            redirect('/portal/customer/add');
          }}
        >
          <PlusIcon className="w-4 h-4 ml-2" />
          إضافة زبون
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>عرض جميع زبائنك أو البحث عن زبون بالتفاصيل</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 gap-2">
            <Input
              placeholder="ابحث بالرقم الموبايل أو الاسم"
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
                <div className="flex justify-center items-center h-full">
                  <Loading />
                </div>
              ) : (
                <CustomerList customers={searchCustomers} onDelete={handleOnDelete} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
