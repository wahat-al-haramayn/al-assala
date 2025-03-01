"use server";

import { createClient } from "@/utils/supabase/server";
import { toCustomerDto } from "../model/customer.model";
import { Order } from "../model/order.model";

export const addOrderAction = async (formData: Order) => {
    const supabase = await createClient();

    const orderDto: Order = {
        customerPhone: formData.customerPhone,
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

export const getOrdersAction = async (): Promise<Order[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*").order("orderDate", { ascending: false });

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data;
};

export const searchOrdersAction = async (search: string): Promise<Order[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*").textSearch("notes", search).order("orderDate", { ascending: false });

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data;
};

export const getOrderByIdAction = async (id: string): Promise<Order | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();

    if (error) {
        console.error(error.code + " " + error.message);
        return null;
    }

    return data;
};

export const updateOrderAction = async (id: string, formData: Order) => {
    const supabase = await createClient();
    const { error } = await supabase.from("orders").update(formData).eq("id", id);

    if (error) {
        console.error(error.code + " " + error.message);
        return false;
    }

    return true;
};

export const getTodayOrdersAction = async (): Promise<Order[]> => {
    const supabase = await createClient();


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase.from("orders").select("*").gte("orderDate", today.toISOString());

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data;
};

export const getOrdersByCustomerIdAction = async (customerId: string): Promise<Order[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*").eq("customerId", customerId).order("orderDate", { ascending: false });

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data;
};
