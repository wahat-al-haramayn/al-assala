export interface Order {
    id?: string;
    customerId: string;
    orderDate?: string;
    deposit: number;
    total: number;
    notes: string;
}

// export interface OrderItem {
//     name: string;
//     quantity: number;
//     price: number;
// }