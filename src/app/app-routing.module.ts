import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


const routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full',
        data: {pageTitle: 'Angular ssr', pageDescription: 'Angular ssr example'}
    },
    {
        path: 'lazy', loadChildren: './modules/lazy/lazy.module#LazyModule',
        data: {pageTitle: 'lazy', pageDescription: 'lazy page'}
    },
    {
        path: 'cards', loadChildren: './modules/cards/cards.module#CardsModule',
        data: {pageTitle: 'cards', pageDescription: 'cards page'}
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
