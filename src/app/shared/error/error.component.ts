import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

    header!: string;
    text!: string;

    routerEventsSubscription = Subscription.EMPTY;

    constructor(private router: Router) {}

    ngOnInit() {
        this.changeText(this.router.url);
        this.routerEventsSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any): void => {
            this.changeText(event.url);
        });
    }

    changeText(url: string): void {
        switch (url) {
        case '/access-denied':
            this.header = '403';
            this.text = 'Access denied. You don\'t have permissions to access this page.';
            break;
        default:
            this.header = '404';
            this.text = 'Page not found.';
        }
    }

    ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
    }
}
