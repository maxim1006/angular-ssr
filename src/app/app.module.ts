import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppShellNoRenderDirective} from './directives/app-shell-no-render.directive';
import {AppShellRenderDirective} from './directives/app-shell-render.directive';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
