import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CardsComponent} from './cards.component';
import {CardComponent} from './card/card.component';

const routes: Routes = [
    {path: '', component: CardsComponent},
    {path: ':id', component: CardComponent},
];

@NgModule({
    declarations: [CardsComponent, CardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class CardsModule {
}
