import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTodayCustomersAction } from "@/lib/actions/customer.actions";
import { getTodayOrdersAction } from "@/lib/actions/order.actions";
import Today from "./(today)";

export default async function PortalPage() {
  const [customers, orders, supabase] = await Promise.all([
    getTodayCustomersAction(),
    getTodayOrdersAction(),
    createClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <Today customers={customers} orders={orders} />;
}
