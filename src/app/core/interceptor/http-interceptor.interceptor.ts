import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, retry, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((returnedError) => {
					let errorMessage: string = "";
					let handled: boolean = false;
					if (returnedError.error instanceof ErrorEvent) {
						errorMessage = `Error: ${returnedError.error.message}`;
					} else if (returnedError instanceof HttpErrorResponse) {
						errorMessage = `Error Status ${returnedError.status}: ${returnedError.error.error} - ${returnedError.error.message}`;
						handled = true
					}
					if (!handled) {
						if (errorMessage) {
							return throwError(() => new Error(errorMessage));
						} else {
							return throwError(() => new Error("Unexpected problem occurred"));
						}
					} else {
						return of(returnedError);
					}
				})
			)
	}
}
