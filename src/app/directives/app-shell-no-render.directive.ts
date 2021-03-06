import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Directive({selector: '[appShellNoRender]'})
export class AppShellNoRenderDirective implements OnInit {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }

        if (isPlatformServer(this.platformId)) {
            this.viewContainer.clear();
        }
    }
}
