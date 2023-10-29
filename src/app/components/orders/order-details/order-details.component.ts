import { Subscription } from 'rxjs';
import { IOrder } from './../../../shared/interface/order';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/service/product.service';
import { IProduct } from 'src/app/shared/interface/product';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ICustomer } from 'src/app/shared/interface/customer';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    ProductSubscription!: Subscription;
    CustomerSubscription!: Subscription;
    AllProducts!: IProduct[];
    ProductsByOrderId!: IProduct[];
    Customer!: ICustomer;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IOrder,
        private productService: ProductService,
        private customerService: CustomerService
    ) { }


    ngOnInit(): void {
        this.getAllProducts();
        this.getCustomer();
    }

    getAllProducts(): void {
        this.ProductSubscription = this.productService.getProducts().subscribe(res => {
            this.AllProducts = res;
            this.getProductsByOrderId(this.data.Products);
        });
    }

    getCustomer(): void {
        this.CustomerSubscription = this.customerService.getCustomers().subscribe((res: ICustomer[]) => {
            const customer = res.find(({ Id }) => Id === this.data.UserId);
            console.log(customer);
            
            if(customer) this.Customer = customer;
        });
    }

    getProductsByOrderId(Products: [{ ProductId: number; Quantity: number; }]): void {
        this.ProductsByOrderId = this.AllProducts.filter((res: IProduct) => Products.find(({ ProductId }) => ProductId === res.ProductId));
    }

    ngOnDestroy(): void {
        this.ProductSubscription?.unsubscribe();
        this.CustomerSubscription?.unsubscribe();
    }

}
