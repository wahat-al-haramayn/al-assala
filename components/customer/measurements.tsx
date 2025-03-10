import { Customer } from '@/lib/model/customer.model';
import { Label } from '../ui/label';

export function CustomerMeasurements({ customer }: { customer: Customer }) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <Label className="bg-card px-2 text-muted-foreground">القياسات</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center gap-2">
          <Label>الكتف</Label>:<Label>{customer.measurement.shoulder}</Label>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Label>المادة</Label>:<Label>{customer.measurement.matter}</Label>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Label>الربع</Label>:<Label>{customer.measurement.quarter}</Label>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Label>الطول</Label>:<Label>{customer.measurement.length}</Label>
        </div>

        <div className="relative col-span-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">البنطلون</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Label>الطول</Label>:<Label>{customer.measurement.pantLength}</Label>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Label>العرض</Label>:<Label>{customer.measurement.pantWidth}</Label>
        </div>
      </div>
    </div>
  );
}
