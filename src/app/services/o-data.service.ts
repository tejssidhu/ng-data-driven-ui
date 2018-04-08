import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ODataService {
	constructor(private http: HttpClient) {

	}

	getItems(baseUrl: string, objectName: string, requiresAuth: boolean): Observable<any[]> {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		this.addAuthHeader(requiresAuth, headers);

		const subject = new Subject<any[]>();
		setTimeout(() => {subject.next(ITEMS); subject.complete(); }, 100);
		return subject;

		/* return this.http.get<any>(baseUrl + objectName, {headers: headers}).pipe(
			map(data => {
				return <any[]>data.value;
			}),
			tap((contacts: any[]) => console.log(`${contacts.length} items loaded`)),
			catchError(this.handleError<any>('getItems'))
		); */
	}

	private addAuthHeader(requiresAuth: boolean, headers: HttpHeaders) {
		if (requiresAuth) {
			const jwt = localStorage['jwt'];
			headers.append('Authorization', 'Bearer ' + jwt);
		}
	}

	getItem(id: string, baseUrl: string, objectName: string, requiresAuth: boolean): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		this.addAuthHeader(requiresAuth, headers);

		return this.http.get<any>(baseUrl + objectName + '(' + id + ')', {headers: headers}).pipe(
			tap((item: any) => console.log(`${item.id} item loaded`)),
			catchError(this.handleError<any>('getItem'))
		);
	}

	createItem(item: any, baseUrl: string, objectName: string, requiresAuth: boolean): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		this.addAuthHeader(requiresAuth, headers);

		return this.http.post<any>(baseUrl + objectName, JSON.stringify(item), {headers: headers}).pipe(
			tap((newItem: any) => console.log(`item created: Id=${item.id}`)),
			catchError(this.handleError<any>('createItem'))
		);
	}

	updateItem(item: any, baseUrl: string, objectName: string, requiresAuth: boolean): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		this.addAuthHeader(requiresAuth, headers);

		return this.http.put(baseUrl + objectName + '(' + item.id + ')', JSON.stringify(item), {headers: headers}).pipe(
			tap((newItem: any) => console.log(`item updated: Id=${newItem.id}`)),
			catchError(this.handleError<any>('updateItem'))
		);
	}

	deleteItem(id: string, baseUrl: string, objectName: string, requiresAuth: boolean): Observable<string> {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		this.addAuthHeader(requiresAuth, headers);

		return this.http.delete(baseUrl + objectName + '(' + id + ')', {headers: headers}).pipe(
			tap((response: string) => console.log(`item deleted: Id=${response}`)),
			catchError(this.handleError<any>('deleteItem'))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}

const ITEMS: any[] = [
	{
		id: 1,
		title: 'title 1',
		forename: 'forename 1',
		surname: 'surname 1',
		job: 'job title 1',
		contactNumber: 'contact number 1'
	},
	{
		id: 2,
		title: 'title 2',
		forename: 'forename 2',
		surname: 'surname 2',
		job: 'job title 2',
		contactNumber: 'contact number 2'
	},
	{
		id: 3,
		title: 'title 3',
		forename: 'forename 3',
		surname: 'surname 3',
		job: 'job title 3',
		contactNumber: 'contact number 3'
	},
	{
		id: 4,
		title: 'title 4',
		forename: 'forename 4',
		surname: 'surname 4',
		job: 'job title 4',
		contactNumber: 'contact number 4'
	},
	{
		id: 5,
		title: 'title 5',
		forename: 'forename 5',
		surname: 'surname 5',
		job: 'job title 5',
		contactNumber: 'contact number 5'
	},
	{
		id: 6,
		title: 'title 6',
		forename: 'forename 6',
		surname: 'surname 6',
		job: 'job title 6',
		contactNumber: 'contact number 6'
	},
	{
		id: 7,
		title: 'title 7',
		forename: 'forename 7',
		surname: 'surname 7',
		job: 'job title 7',
		contactNumber: 'contact number 7'
	},
	{
		id: 8,
		title: 'title 8',
		forename: 'forename 8',
		surname: 'surname 8',
		job: 'job title 8',
		contactNumber: 'contact number 8'
	},
	{
		id: 9,
		title: 'title 9',
		forename: 'forename 9',
		surname: 'surname 9',
		job: 'job title 9',
		contactNumber: 'contact number 9'
	},
	{
		id: 10,
		title: 'title 10',
		forename: 'forename 10',
		surname: 'surname 10',
		job: 'job title 10',
		contactNumber: 'contact number 10'
	}
];
