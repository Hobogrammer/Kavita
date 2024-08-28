import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { TranslocoDirective } from "@ngneat/transloco";
import { KeyBinding } from "src/app/_models/key-binding/key-binding";
import { KeyBindingService } from "src/app/_services/key-binding.service";
import { AsciiCharacterPipe } from "src/app/_pipes/ascii-character.pipe";

@Component({
    selector: 'app-manage-key-bindings',
    standalone: true,
    imports: [TranslocoDirective, AsciiCharacterPipe],
    styleUrl: './manage-key-bindings.component.scss',
    templateUrl: './manage-key-bindings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageKeyBindingsComponent implements OnInit {
    private readonly keyBindingService = inject(KeyBindingService);
    keyBindings: KeyBinding[] = []

    ngOnInit(): void {
       this.loadData(); 
    }

    loadData() {
        // const KeyBinding = this.keyBindingService.getAllKeyBindings();
        this.keyBindings.push({id: 1, readerType: 0, nextPage: 27, previousPage: 115, close: 126, fullScreen: 102, toggleMenu: 116 } as KeyBinding);
    }
}