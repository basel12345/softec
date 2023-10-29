export interface IOrder {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: [{
        ProductId: number;
        Quantity: number;
    }];
    PaymentType: number;
}