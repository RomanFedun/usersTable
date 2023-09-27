import { Injectable } from '@angular/core';
import { BehaviorSubject, take, timer } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    users$ = new BehaviorSubject<User[]>([]);
    currentUser$ = new BehaviorSubject<User>({} as User);
    showToast$ = new BehaviorSubject<{mess: string; succ: boolean} | null>({} as {mess: string; succ: boolean});
    constructor(
    ) { }

    getUsers() {
        let usersList: null | string | {users: User[]} = localStorage.getItem('users');
        if (usersList) {
            usersList = JSON.parse(usersList) as {users: User[]};
            this.users$.next(usersList.users);
        } else {
            this.users$.next([]);
        }
    }

    createUser(user: User) {
        const users = this.users$.getValue();
        users.push(user);
        localStorage.setItem('users', JSON.stringify({users}));

        this.users$.next(users);
        this.showToast({mess: 'user created', succ: true});
    }

    updateUser(updatedUser: User) {
        const users = this.users$.getValue().map(user => {
            return user.userName === updatedUser.userName ? {...user, ...updatedUser} : user;
        });
        localStorage.setItem('users', JSON.stringify({users}));

        this.users$.next(users);
        this.showToast({mess: 'user updated', succ: true});
    }

    deleteUser() {
        const userDeleted = this.currentUser$.getValue();
        const users = this.users$.getValue()
            .filter(user => user.userName !== userDeleted.userName);
        localStorage.setItem('users', JSON.stringify({users}));

        this.users$.next(users);
        this.showToast({mess: 'user deleted', succ: true});
    }

    showToast(message: {mess: string; succ: boolean}) {
        this.showToast$.next(message);
        timer(3000).pipe(take(1),
        ).subscribe(() => {
            this.showToast$.next(null);
        });
    }
}
