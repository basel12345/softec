import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http"
import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditQuantityComponent } from './edit-quantity/edit-quantity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOrderComponent } from './add-order/add-order.component';
import { CustomerService } from 'src/app/shared/service/customer.service';

const routes: Routes = [
	{
		path: "",
		component: ProductsComponent
	}
];

@NgModule({
	declarations: [
		ProductsComponent,
		EditQuantityComponent,
		AddOrderComponent
	],
	imports: [
		HttpClientModule,
		RouterModule.forChild(routes),
		CommonModule,
		MatDialogModule,
		ReactiveFormsModule
	],
	providers: [
		ProductService,
		CustomerService
	]
})
export class ProductModule { }
