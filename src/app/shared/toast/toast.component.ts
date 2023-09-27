import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements AfterViewInit {

    isToast$!: Observable<{mess: string; succ: boolean} | null>;

    @Input() background = '#78d578';

    @ViewChild('toast') toast: ElementRef = {} as ElementRef;

    constructor(private userService: UsersService) {
        this.isToast$ = this.userService.showToast$.asObservable();
    }

    ngAfterViewInit() {
        if(this.toast) {
            this.toast.nativeElement.style.background = this.background;
        }
    }
}
