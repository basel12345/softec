import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLPath } from '../Url';
import { Observable } from 'rxjs';
import { IOrder } from '../interface/order';

@Injectable()
export class OrdereService {

	constructor(private http: HttpClient) { }

	getOrders(): Observable<IOrder[]> {
		return this.http.get<IOrder[]>(`${URLPath}/orders.json`);
	}

}

