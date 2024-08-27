import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { SideNavCompanionBarComponent } from "../../../sidenav/_components/side-nav-companion-bar/side-nav-companion-bar.component";
import { TranslocoDirective } from "@ngneat/transloco";
import { Router, RouterLink } from "@angular/router";
import { KeyBindingService } from "../../../_services/key-binding.service";
import { KeyBinding } from "../../../_models/key-binding/key-binding";
import { ReaderType } from "../../../_models/key-binding/reader-type";
import { ManageKeyBindingsComponent } from "../manage-key-bindings/manage-key-bindings.component";

@Component({
    selector: 'app-all-key-bindings',
    standalone: true,
    imports: [TranslocoDirective, SideNavCompanionBarComponent, RouterLink, ManageKeyBindingsComponent],
    templateUrl: './all-key-bindings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllKeyBindingsComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly keyBindingService = inject(KeyBindingService);

    keyBindings: KeyBinding[] = [];

    ngOnInit(): void {
       this.loadData(); 
    }

    loadData() {
        // const keyBindings = this.keyBindingService.getAllKeyBindings();
        this.keyBindings.push({id: 1, readerType: 0, nextPage: 55, previousPage: 51, close: 13, fullScreen: 49, toggleMenu: 63 } as KeyBinding);
    }
}