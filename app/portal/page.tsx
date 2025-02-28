import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTodayCustomersAction } from "@/lib/actions/customer.actions";
import { getTodayOrdersAction } from "@/lib/actions/order.actions";
import Today from "./(today)";

export default async function PortalPage() {
  const customers = await getTodayCustomersAction();
  const orders = await getTodayOrdersAction();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <Today customers={customers} orders={orders} />;
}
