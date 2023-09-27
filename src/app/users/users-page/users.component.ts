import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
    selector: 'users-page',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
    defaultHeaders = [
        'UserName', 'firstName', 'lastName', 'email', 'type'
    ];

    usersList$!: Observable<User[]>;
    toast$!: Observable<{mess: string; succ: boolean}>;

    routeSnapshotSubscription = Subscription.EMPTY;
    isUsersPage = true;
    isError!: boolean;

    constructor(
        private router: Router,
        private userService: UsersService,
    ) { }
    ngOnInit() {
        this.routeSnapshotSubscription = this.router.events.subscribe(
            () => {
                this.isUsersPage = location.pathname === '/app/users-page';
            }
        );

        this.userService.getUsers();
        this.usersList$ = this.userService.users$.asObservable();
    }

    ngOnDestroy() {
        this.routeSnapshotSubscription.unsubscribe();
    }

    buttonClick() {
        this.router.navigate([
            'users-page/create',
        ]);
    }

    rowClick(userName: string) {
        this.router.navigate([
            `users-page/edit`, userName
        ]);
    }
}
