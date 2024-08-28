import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'asciiCharacter',
    standalone: true
})
export class AsciiCharacterPipe implements PipeTransform {
    transform(value: number): string {
        if (value == 27) {
            return "ESC";
        }
        if (value == 33) {
            return "PgUp"
        }
       return String.fromCharCode(value);
    }
}