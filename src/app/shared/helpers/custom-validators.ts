import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors, ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HelperService } from './helper.service';

export class CustomValidators {
    static emailValidator(helperService: HelperService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return helperService
                .checkEmailExists(control.value)
                .pipe(
                    map((result: boolean) =>
                        result ? { emailAlreadyExists: true } : null
                    )
                );
        };
    }

    static userNameValidator(helperService: HelperService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return helperService
                .checkUsernameExists(control.value)
                .pipe(
                    map((result: boolean) =>
                        result ? { userNameExists: true } : null
                    )
                );
        };
    }

    static confirmPasswordValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        return control.value.password === control.value.repeatPassword
            ? null
            : { PasswordNoMatch: true };
    };
}
