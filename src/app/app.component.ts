import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators/switchMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    text = 'angular-ssr';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) {
        if (isPlatformBrowser(this.platformId)) {
            window.setTimeout(() => {
                    console.log('setTimeout in ssr');
                }
            );
        }

        // так тоже сработает, а с window нет
        // setTimeout(() => {
        //     console.log('setTimeout in ssr');
        // }, 100);



        // задаю мета таги и title
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.route),
                map(route => route.firstChild),
                switchMap(route => route.data)
            )
            .subscribe(({pageTitle, pageDescription}) => {
                this.title.setTitle(pageTitle);
                this.meta.updateTag(
                    {
                        name: 'description',
                        content: pageDescription
                    }
                );

                this.meta.updateTag({name: 'twitter:card', content: 'page'});
                this.meta.updateTag({name: 'twitter:site', content: 'AngularSSR'});
                this.meta.updateTag({name: 'twitter:title', content: pageDescription});
                this.meta.updateTag({name: 'twitter:description', content: pageDescription});
                this.meta.updateTag({name: 'twitter:text:description', content: pageDescription});
                this.meta.updateTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/3056353?s=400&v=4'});
            });
    }
}

