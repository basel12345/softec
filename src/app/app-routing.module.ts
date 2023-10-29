import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: "",
		redirectTo: "products",
		pathMatch: 'full'
	},
	{
		path: "orders",
		loadChildren: () => import("./components/orders/orders.module").then(m => m.OrderModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
