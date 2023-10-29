import { CustomerService } from 'src/app/shared/service/customer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from 'src/app/shared/interface/customer';

@Component({
	selector: 'app-add-order',
	templateUrl: './add-order.component.html',
	styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
	OrderForm!: FormGroup;
	Customers!: ICustomer[];
	Submitted!: boolean;
	constructor(
		public dialogRef: MatDialogRef<AddOrderComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any[],
		private fb: FormBuilder,
		public dialog: MatDialog,
		private customerService: CustomerService
	) { }

	ngOnInit() {
		this.createOrderForm();
		this.getAllCustomers();
	}

	createOrderForm(): void {
		this.OrderForm = this.fb.group({
			OrderDate: [new Date(), Validators.required],
			UserId: ['', Validators.required],
			Products: this.fb.array([]),
			PaymentType: ['', Validators.required],
		});
		this.InserDataProducts();
	};

	InserDataProducts() {
		this.data.forEach(res => {
			this.Products.push(
				this.fb.group({
					ProductId: [res.ProductId, Validators.required],
					Quantity: [res.ProductId, Validators.required]
				})
			);
		})
	}

	get Products() { return this.OrderForm.get("Products") as FormArray; }

	getAllCustomers() {
		this.customerService.getCustomers().subscribe(res => {
			this.Customers = res;
		})
	}

	Submit(): void {
		this.Submitted = true;
		if (this.OrderForm.invalid) {
			return;
		}
		this.dialogRef.close({ data: this.OrderForm.getRawValue() });
	}
}
