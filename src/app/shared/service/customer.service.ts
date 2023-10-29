import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLPath } from '../Url';
import { Observable } from 'rxjs';
import { ICustomer } from '../interface/customer';

@Injectable()
export class CustomerService {

	constructor(private http: HttpClient) { }

	getCustomers(): Observable<ICustomer[]> {
		return this.http.get<ICustomer[]>(`${URLPath}/users.json`);
	}
}
