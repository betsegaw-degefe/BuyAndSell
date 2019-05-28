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
    private headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient, private configuration: Configuration) {
        this.actionUrl = configuration.serverWithApiUrl + 'account/';
    }

    // login(data: any): Observable<any> {
    //     return this.http.post<any>(this.actionUrl + 'login', data)
    //         .pipe(
    //             tap(_ => this.log('login')),
    //             catchError(this.handleError('login', []))
    //         );
    // }

    login(model: any): Observable<any> {
        return this.http.post(this.actionUrl + 'login', model)
            .pipe(
                tap(_ => this.log('login')),
                catchError(this.handleError('login', []))
            );
    }

    register(model: any): Observable<any> {
        model.addressId = parseInt(model.address);
        model.active = true;
        model.lastOnline = new Date().toLocaleDateString();
        console.log(isNumber(model.addressId));
        return this.http.post(this.actionUrl + 'register', model)
            .pipe(
                tap(_ => this.log('register')),
                catchError(this.handleError('register', []))
            );
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
        //console.log(message);
    }

}