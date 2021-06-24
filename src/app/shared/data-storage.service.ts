import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageSerice {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}
    
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        this.http.get<Recipe []>('https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => {
            this.recipeService.setRecipes(recipes)
        })
    }
}