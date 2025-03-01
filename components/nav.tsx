"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/portal" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                pathname === "/portal"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <p className="font-semibold">الرئيسية</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/portal/customer" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                pathname === "/portal/customer"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <p className="font-semibold">الزبائن</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/portal/order" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                pathname === "/portal/order"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <p className="font-semibold">الطلبات</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
