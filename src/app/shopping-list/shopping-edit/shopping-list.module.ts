import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "../shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit.component";

@NgModule({
    declarations: [
        ShoppingListComponent, 
        ShoppingEditComponent, 
        ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'shopping-list', component: ShoppingListComponent},
    ])],
    exports: [RouterModule]
})
export class ShoppingListModule {

}