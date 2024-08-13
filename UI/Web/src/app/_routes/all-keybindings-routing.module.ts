import {Routes} from "@angular/router";
import {AllKeyBindingsComponent} from "../all-keybindings/all-keybindings.component";


export const routes: Routes = [
  {path: '', component: AllKeyBindingsComponent, pathMatch: 'full'},
];