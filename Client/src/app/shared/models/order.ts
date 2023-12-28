import { Address } from "./user";

export interface OrderToCreate{
    basketID : string;
    deliveryMethod : number;
    shipToAddress : Address
}

export interface Order{
    id: number;
    buyerEmail : string;
    orderDate : string;
    shipToAddress : Address;
    deliveryMethod : string;
    shippingPrice : number;
    orderItems : OrderItem[];
    subTotal : number;
    status : string;
}

export interface OrderItem{
    productID : number;
    productName : string;
    imgUrl : string;
    price : number;
    quantity : number;
}