import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private usersService: UsersService) { }

    checkEmailExists(email: string): Observable<boolean> {
        const users = this.usersService.users$.getValue();
        const isEmailExists = users.find(item => item.email === email);

        return of(!!isEmailExists).pipe(
            delay(3000)
        );
    }

    checkUsernameExists(userName: string) {
        const users = this.usersService.users$.getValue();
        const isUserNameExists = users.find(item => item.userName === userName);

        return of(!!isUserNameExists);
    }
}
