import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FamilyService {

    constructor(private http: HttpClient) {
    }

    public getFamily() {
        return this.http
                    .get<{name: string}[]>('http://localhost:4000/assets/mocks/family.json')
                    .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error(
            `
                An error occurred: ${error.error && error.error.message}
                Backend returned code ${error.status}
                body was: ${error.error}
            `
        );

        return throwError(
            'Something bad happened; please try again later.');
    }
}
