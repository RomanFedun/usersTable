import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'fromCamelCase',
    standalone: true
})
export class FromCamelCasePipe implements PipeTransform {

    transform(value: string): string {
        const result = value.replace( /([A-Z])/g, ' $1' );
        return result.charAt(0) + result.slice(1);
    }
}
