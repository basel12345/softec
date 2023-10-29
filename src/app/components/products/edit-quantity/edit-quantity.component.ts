import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/shared/interface/product';

@Component({
	selector: 'app-edit-quantity',
	templateUrl: './edit-quantity.component.html',
	styleUrls: ['./edit-quantity.component.scss']
})
export class EditQuantityComponent implements OnInit {
	form!: FormGroup;
	constructor(
		public dialogRef: MatDialogRef<EditQuantityComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IProduct,
		private fb: FormBuilder,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.form = this.fb.group({
			ProductId: ["", Validators.required],
			AvailablePieces: ["", Validators.required]
		});
		this.form.patchValue(this.data);
	}

	Submit(): void {
		this.dialogRef.close({data: this.form.getRawValue()});
	}
}
