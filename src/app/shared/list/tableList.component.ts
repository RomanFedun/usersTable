import {
    Component,
    EventEmitter,
    Input,
    OnDestroy, OnInit,
    Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { FromCamelCasePipe } from '../../pipes/from-camel-case.pipe';

@Component({
    selector: 'table-list',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ButtonComponent, FromCamelCasePipe],
    templateUrl: './tableList.component.html',
    styleUrls: ['./tableList.component.scss'],
})
export class TableListComponent implements OnInit, OnDestroy {

    tableValues: string[][] = [];
    tableContent: User[] = [];

    tableContentSubscription = Subscription.EMPTY;

    @Input() tableContent$!: Observable<User[]>; // can be reusable
    @Input() TableHeaders = [] as string[];

    @Output() clickButton: EventEmitter<Event> = new EventEmitter();
    @Output() clickRow: EventEmitter<string> = new EventEmitter();

    constructor(private userService: UsersService) {
    }

    ngOnInit() {
        this.tableContentSubscription = this.tableContent$.subscribe(
            content => {
                this.tableContent = content;
                this.tableValues = [];

                for (let i = 0; i < content.length; i++) {
                    const item = Object.values(content[i]);
                    item.length = this.TableHeaders.length;
                    this.tableValues.push(item);
                }
            }
        );
    }

    ngOnDestroy() {
        this.tableContentSubscription.unsubscribe();
    }

    clickBtn() {
        this.clickButton.emit();
    }

    rowClick(user: User) {
        this.clickRow.emit(user.userName);
        this.userService.currentUser$.next(user);
    }
}
