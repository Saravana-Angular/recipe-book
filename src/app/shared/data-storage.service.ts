import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
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
        return this.http.get<Recipe []>('https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }),tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}