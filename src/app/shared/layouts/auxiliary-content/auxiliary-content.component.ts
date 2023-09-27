import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'auxiliary-content',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './auxiliary-content.component.html',
    styleUrls: ['./auxiliary-content.component.scss']
})
export class AuxiliaryContentComponent {

}
