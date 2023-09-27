import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UsersComponent } from './users-page/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RouterModule, Routes } from '@angular/router';
import { AuxiliaryContentComponent } from '../shared/layouts/auxiliary-content/auxiliary-content.component';
import { TableListComponent } from '../shared/list/tableList.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';
import { CloseButtonComponent } from '../shared/close-button/close-button.component';
import { ToastComponent } from '../shared/toast/toast.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users-page'
    },
    {
        path: 'users-page',
        component: UsersComponent,
        children: [
            {
                path: 'edit/:userName',
                component: CreateUserComponent,
                data: {editMode: true}
            },
            {
                path: 'create',
                component: CreateUserComponent,
                data: {createMode: true}
            }
        ]
    }
];

@NgModule({
    declarations: [
        UsersComponent,
        CreateUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AuxiliaryContentComponent,
        TableListComponent,
        ReactiveFormsModule,
        ButtonComponent,
        NgOptimizedImage,
        CloseButtonComponent,
        ToastComponent
    ]
})
export class UsersModule { }
