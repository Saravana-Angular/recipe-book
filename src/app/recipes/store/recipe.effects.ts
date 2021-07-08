import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>) {}

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

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        exhaustMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/recipes.json', 
                recipesState.recipes)
        
        })
    )
}