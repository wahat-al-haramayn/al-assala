
export interface Customer {
    id?: string;
    phoneNumber: string;
    name: string;
    measurement: Measurement;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Measurement {
    shoulder: number;
    matter: number;
    quarter: number;
    length: number;
    pantLength: number;
    pantWidth: number;
}

export interface CustomerDto {
    id?: number;
    phoneNumber: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    shoulder: number;
    matter: number;
    quarter: number;
    length: number;
    pantLength: number;
    pantWidth: number;
}

export function toCustomerDto(customer: Customer): CustomerDto {
    return {
        phoneNumber: customer.phoneNumber,
        name: customer.name,
        updatedAt: customer.updatedAt,
        createdAt: customer.createdAt,
        ...customer.measurement,
    };
}

export function toCustomer(customerDto: CustomerDto): Customer {
    return {
        id: customerDto.id?.toString() ?? "",
        phoneNumber: customerDto.phoneNumber,
        name: customerDto.name,
        measurement: {
            shoulder: customerDto.shoulder,
            matter: customerDto.matter,
            quarter: customerDto.quarter,
            length: customerDto.length,
            pantLength: customerDto.pantLength,
            pantWidth: customerDto.pantWidth,
        },
        createdAt: customerDto.createdAt,
        updatedAt: customerDto.updatedAt,
    }
}