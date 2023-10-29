import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http"
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdereService } from 'src/app/shared/service/order.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerService } from 'src/app/shared/service/customer.service';

const routes: Routes = [
    {
        path: "",
        component: OrdersComponent
    }
];

@NgModule({
    declarations: [
        OrdersComponent,
        OrderDetailsComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule,
        MatDialogModule
    ],
    providers: [
        OrdereService,
        ProductService,
        CustomerService
    ]
})
export class OrderModule { }
