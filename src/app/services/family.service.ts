import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {of} from 'rxjs/internal/observable/of';
import {isPlatformServer} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FamilyService {

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        private transferState: TransferState
    ) {
    }

    public getFamily() {
        const FAMILY_KEY = makeStateKey<any>('key-' + 'unique-transfer-state-family');

        if (this.transferState.hasKey(FAMILY_KEY)) {
            const family = this.transferState.get<any>(FAMILY_KEY, null);

            this.transferState.remove(FAMILY_KEY);

            return of(family);
        } else {
            // если сервер уже сделал запрос и сохранил значение в transferState, то достаю его оттуда
            // в противном случае делаю запрос (на сервер сайд) и кладу дату в transferState, при этом
            // проверяю if (isPlatformServer(this.platformId)) {...
            return this.http
                .get<{ name: string }[]>('http://localhost:4000/assets/mocks/family.json')
                .pipe(
                    tap((family) => {
                        if (isPlatformServer(this.platformId)) {
                            this.transferState.set<any>(FAMILY_KEY, family);
                        }
                    }),
                    catchError(this.handleError)
                );
        }
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
