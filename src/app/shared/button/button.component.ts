import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
    @Input() background = '#4499fa';
    @Input() buttonText = '';

    @ViewChild('btn') button: ElementRef = {} as ElementRef;

    @Output() clickEvent: EventEmitter<Event> = new EventEmitter();

    ngAfterViewInit() {
        this.button.nativeElement.style.background = this.background;
    }

    onClick() {
        this.clickEvent.emit();
    }
}
