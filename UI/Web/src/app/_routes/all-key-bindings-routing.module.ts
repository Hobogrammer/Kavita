import {Routes} from "@angular/router";
import { AllKeyBindingsComponent } from "../key-bindings/_components/all-key-bindings/all-key-bindings.component";

export const routes: Routes = [
  {path: '', component: AllKeyBindingsComponent, pathMatch: 'full'},
];