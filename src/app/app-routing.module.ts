import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


const routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full',
        data: {pageTitle: 'Angular ssr', pageDescription: 'Angular ssr example'}
    },
    {
        path: 'lazy',
        loadChildren: () => import('./modules/lazy/lazy.module').then(m => m.LazyModule),
        data: {pageTitle: 'lazy', pageDescription: 'lazy page'}
    },
    {
        path: 'cards',
        loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule),
        data: {pageTitle: 'cards', pageDescription: 'cards page'}
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
