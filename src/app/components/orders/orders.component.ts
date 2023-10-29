import { ProductService } from 'src/app/shared/service/product.service';
import { IOrder } from './../../shared/interface/order';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter } from 'rxjs';
import { OrdereService } from 'src/app/shared/service/order.service';
import { IProduct } from 'src/app/shared/interface/product';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
	Orders$!: Observable<IOrder[]>;
	ProductSubscription!: Subscription;
	Products!: IProduct[];

	constructor(
		private ordereService: OrdereService,
		private productService: ProductService,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.getAllOrders();
		this.getAllProducts();
	}

	getAllOrders(): void {
		this.Orders$ = this.ordereService.getOrders();
	}

	getAllProducts(): void {
		this.ProductSubscription = this.productService.getProducts().subscribe(res => {
			this.Products = res;
		});
	}

	calculateTotalPriceOrders(Products: [{ ProductId: number; Quantity: number; }]) {
		return this.Products.filter((res: IProduct) => Products.find(({ ProductId }) => ProductId === res.ProductId))
			.map((res: IProduct) => ({ ...res, Quantity: Products.find(({ ProductId }) => ProductId === res.ProductId)?.Quantity }))
			.reduce((previousValue, Product) => previousValue + (Product.ProductPrice * (Product.Quantity ? Product.Quantity : 0)), 0)
	}

	openDialog(Order: IOrder) {
		const dialogRef = this.dialog.open(OrderDetailsComponent, {
			data: Order,
			width: "50vw"
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	ngOnDestroy(): void {
		this.ProductSubscription.unsubscribe();
	}
}
