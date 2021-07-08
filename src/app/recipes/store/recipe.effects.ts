import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        exhaustMap(() => {
            return this.http.get<Recipe []>(
                'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/recipes.json'
                )
        }
        ),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })
    )
}