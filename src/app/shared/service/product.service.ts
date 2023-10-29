import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLPath } from '../Url';
import { Observable } from 'rxjs';
import { IProduct } from '../interface/product';

@Injectable()
export class ProductService {

	constructor(private http: HttpClient) { }

	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(`${URLPath}/porducts.json`);
	}
}
