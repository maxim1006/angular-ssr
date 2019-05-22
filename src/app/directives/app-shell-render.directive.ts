import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Directive({selector: '[appShellRender]'})
export class AppShellRenderDirective implements OnInit {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.viewContainer.clear();
        }

        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
