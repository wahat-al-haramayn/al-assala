import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Customer } from "@/lib/model/customer.model";
import Link from "next/link";

export function CustomerAvatar({
  customer,
  disabled,
}: {
  customer: Customer;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div className={`flex items-center space-x-4 gap-2 min-w-[12rem]`}>
        <Avatar>
          <AvatarImage
            src={`https://avatar.iran.liara.run/public/${customer.id ?? 0 % 100}`}
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{customer.name}</p>
          <p className="text-sm text-muted-foreground">
            {customer.phoneNumber}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/portal/customer/${customer.id}`}
      className={`flex items-center space-x-4 gap-2 min-w-[12rem]`}
    >
      <Avatar>
        <AvatarImage
          src={`https://avatar.iran.liara.run/public/${customer.id ?? 0 % 100}`}
        />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none">{customer.name}</p>
        <p className="text-sm text-muted-foreground">{customer.phoneNumber}</p>
      </div>
    </Link>
  );
}
