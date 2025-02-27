"use server";

import { encodedRedirect } from "@/utils/utils";
import { Customer, CustomerDto, toCustomer, toCustomerDto } from "../model/customer.model";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const addCustomerAction = async (formData: Customer) => {
    const supabase = await createClient();

    const customerDto: CustomerDto = toCustomerDto(formData);

    const { error } = await supabase.from("customers").insert(customerDto);

    if (error) {
        console.error(error.code + " " + error.message);
        return false;
    }

    return true;
};

export const getCustomerByIdAction = async (id: string): Promise<Customer | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("customers").select("*").eq("id", id);

    if (error || !data || data.length === 0) {
        console.error(error?.code + " " + error?.message);
        return null;
    }

    return toCustomer(data[0]);
};

export const updateCustomerAction = async (id: string, formData: Customer) => {
    const supabase = await createClient();

    const customerDto: CustomerDto = toCustomerDto(formData);

    const { error } = await supabase.from("customers").update(customerDto).eq("id", id);

    if (error) {
        console.error(error.code + " " + error.message);
        return false;
    }

    return true;
};

export const getCustomerByPhoneNumberAction = async (phoneNumber: string): Promise<Customer | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("customers").select("*").eq("phoneNumber", phoneNumber);

    if (error || !data || data.length === 0) {
        console.error(error?.code + " " + error?.message);
        return null;
    }

    return toCustomer(data[0]);
};

export const getCustomersAction = async (): Promise<Customer[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("customers").select("*").limit(10).order("createdAt", { ascending: false });

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data.map(toCustomer);
};


export const searchCustomersAction = async (search: string): Promise<Customer[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("customers")
        .select()
        .textSearch("customer_search", search);

    if (error) {
        console.error(error.code + " " + error.message);
        return [];
    }

    return data.map(toCustomer);
};