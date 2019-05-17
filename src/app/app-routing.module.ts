import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


const routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: 'lazy', loadChildren: './modules/lazy/lazy.module#LazyModule'},
    {path: 'cards', loadChildren: './modules/cards/cards.module#CardsModule'}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
