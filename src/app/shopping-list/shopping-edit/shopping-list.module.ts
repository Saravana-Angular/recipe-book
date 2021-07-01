import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ShoppingListComponent } from "../shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit.component";

@NgModule({
    declarations: [
        ShoppingListComponent, 
        ShoppingEditComponent, 
        ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {path: 'shopping-list', component: ShoppingListComponent},
        ]),
        SharedModule
    ],
    exports: [RouterModule]
})
export class ShoppingListModule {

}