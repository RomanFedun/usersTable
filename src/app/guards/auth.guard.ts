import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (): boolean => {

    // here should be authentication logic

    return true;
};
