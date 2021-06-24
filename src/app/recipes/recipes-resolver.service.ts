import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataStorageSerice } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService {
    
    constructor(private dataStorageService: DataStorageSerice, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }
        return recipes;
    }

}