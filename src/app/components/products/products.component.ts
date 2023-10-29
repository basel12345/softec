import { AddOrderComponent } from './add-order/add-order.component';
import { EditQuantityComponent } from './edit-quantity/edit-quantity.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interface/product';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	ProductsSubscription!: Subscription;
	Products!: IProduct[];
	selectedProducts: { ProductId: number, Quantity: number }[] = [];
	constructor(
		private productService: ProductService,
		public dialog: MatDialog
	) {
	}

	ngOnInit(): void {
		this.getAllProducts();
	}

	getAllProducts(): void {
		this.ProductsSubscription = this.productService.getProducts().subscribe(res => {
			this.Products = res
		});
	}

	editQuantityDialog(Product: IProduct) {
		const dialogRef = this.dialog.open(EditQuantityComponent, {
			data: Product,
			width: "50vw"
		});
		dialogRef.afterClosed().subscribe(result => {
			this.Products = this.Products.map(res => {
				if (res.ProductId === result.data['ProductId']) res.AvailablePieces = result.data['AvailablePieces'];
				return res
			})
		});
	}


	addOrder() {
		const dialogRef = this.dialog.open(AddOrderComponent, {
			data: this.selectedProducts,
			width: "50vw"
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(result);

		});
	}

	selectProduct(event: any, ProductId: number) {
		if (event.target.checked) this.selectedProducts.push({ ProductId: ProductId, Quantity: 1 });
		else this.selectedProducts = this.selectedProducts.filter(res => res.ProductId !== ProductId);
	}
}
