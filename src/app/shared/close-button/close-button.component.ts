import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-close-button',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './close-button.component.html',
    styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent {

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter();

  onClick() {
      this.clickEvent.emit();
  }
}
