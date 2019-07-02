import { HttpClient } from '@angular/common/http';
import { Http, Headers } from "@angular/http";
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Configuration } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable()
export class AuthService {
    private actionUrl: string;

    constructor(private http: HttpClient, private configuration: Configuration) {
        this.actionUrl = configuration.serverWithApiUrl + 'account/';
    }

    login(model: any): Observable<any> {
        console.log(model);
        return this.http.post<any>(this.actionUrl + 'login', model)
            .pipe(
                tap(_ => this.log('login')),
                catchError(this.handleError('login', []))
            );
    }

    register(model: any): Observable<any> {
        model.addressId = parseInt(model.address);
        model.active = true;
        model.lastOnline = new Date().toLocaleDateString();
        return this.http.post<any>(this.actionUrl + 'register', model)
            .pipe(
                tap(_ => this.log('register')),
                catchError(this.handleError('register', []))
            );
    }

    getUserById(id: number) {
        return this.http.get<any>(this.actionUrl + id)
            .pipe(
                tap(),
                catchError(this.handleError('Get user by id', []))
            )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }

}