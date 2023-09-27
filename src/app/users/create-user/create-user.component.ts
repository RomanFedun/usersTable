import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import { HelperService } from '../../shared/helpers/helper.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

    editMode!: boolean | undefined;
    header = 'Create new user';

    currentUserSubscription = Subscription.EMPTY;

    form!: FormGroup;
    types = ['Admin', 'Driver'];
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

    constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
    ) {
        this.editMode = this.route.snapshot.data['editMode'];

        if (this.editMode) {
            this.form = fb.group({
                userName: ['', Validators.required],
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                type: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
                repeatPassword: ['', Validators.required]
            },
            { validators: CustomValidators.confirmPasswordValidator }
            );
        } else {
            this.form = fb.group({
                userName: ['', Validators.required, [
                    CustomValidators.userNameValidator(this.helperService)
                ]],
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email], [
                    CustomValidators.emailValidator(this.helperService)
                ]],
                type: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
                repeatPassword: ['', Validators.required]
            },
            { validators: CustomValidators.confirmPasswordValidator }
            );
        }
    }

    ngOnInit() {
        if (this.editMode) {
            let currentUser: User;
            this.currentUserSubscription = this.userService.currentUser$.subscribe(
                user => {
                    currentUser = user;
                    this.form.patchValue(currentUser);
                    this.header = `${currentUser.firstName} ${currentUser.lastName}`;
                }
            );
        }
    }

    ngOnDestroy() {
        if (this.editMode) {
            this.currentUserSubscription.unsubscribe();
        }
    }

    onSubmit() {
        this.userService.createUser(this.form.value);
        this.form.reset();
    }

    deleteUser() {
        this.userService.deleteUser();

        this.onClose();
    }

    editUser() {
        if (!this.form.invalid) {
            this.userService.updateUser(this.form.value);
            this.onClose();
        }
    }

    onClose() {
        this.router.navigate(['/']);
    }
}


