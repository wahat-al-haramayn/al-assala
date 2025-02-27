"use server";

import { createClient } from "@/utils/supabase/server";
import { toCustomerDto } from "../model/customer.model";
import { Order } from "../model/order.model";

export const addOrderAction = async (formData: Order) => {
    const supabase = await createClient();

    const orderDto: Order = {
        customerId: formData.customerId,
        deposit: formData.deposit,
        total: formData.total,
        notes: formData.notes
    };

    const { error } = await supabase.from("orders").insert(orderDto);

    if (error) {
        console.error(error.code + " " + error.message);
        return false;
    }

    return true;
};