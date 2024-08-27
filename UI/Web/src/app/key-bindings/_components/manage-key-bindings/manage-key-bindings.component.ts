import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { TranslocoDirective } from "@ngneat/transloco";
import { KeyBinding } from "src/app/_models/key-binding/key-binding";
import { KeyBindingService } from "src/app/_services/key-binding.service";

@Component({
    selector: 'app-manage-key-bindings',
    standalone: true,
    imports: [TranslocoDirective],
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
        this.keyBindings.push({id: 1, readerType: 0, nextPage: 55, previousPage: 51, close: 13, fullScreen: 49, toggleMenu: 63 } as KeyBinding);
    }
}