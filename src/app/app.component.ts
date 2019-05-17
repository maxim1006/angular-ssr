import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-ssr';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            window.setTimeout(() => {
                    console.log('setTimeout in ssr');
                }
            );
        }

        // так тоже сработает, а с window нет
        setTimeout(() => {
            console.log('setTimeout in ssr');
        }, 100);
    }

}

