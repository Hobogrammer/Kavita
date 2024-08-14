import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { SideNavCompanionBarComponent } from "../sidenav/_components/side-nav-companion-bar/side-nav-companion-bar.component";
import { TranslocoDirective } from "@ngneat/transloco";
import { Router, RouterLink } from "@angular/router";
import { KeyBindingService } from "../_services/key-binding.service";

@Component({
    selector: 'app-all-key-bindings',
    standalone: true,
    imports: [TranslocoDirective, SideNavCompanionBarComponent, RouterLink],
    templateUrl: './all-key-bindings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllKeyBindingsComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly keyBindingService = inject(KeyBindingService);

    ngOnInit(): void {
       this.loadData(); 
    }
}