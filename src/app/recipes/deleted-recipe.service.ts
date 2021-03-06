import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe []>();

    // recipes: Recipe[] = [
    //     new Recipe(
    //       'Tasty Schnitzel',
    //       'A super-tasty schnitzel - just awesome',
    //       'https://tse1.mm.bing.net/th?id=OIP.Uf7IpniAaFkXuHuxxcR5mgHaGi&pid=Api&P=0&w=176&h=157',
    //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    //     new Recipe(
    //       'Big Fat Burger',
    //       'What else you need to say?',
    //       'https://tse4.mm.bing.net/th?id=OIP.Fofqzr_KgS6BCRJHgVw-cgHaJ4&pid=Api&P=0&w=300&h=300',
    //     [ new Ingredient('Buns', 2), new Ingredient('Meat', 1)]),
    //   ];

    recipes: Recipe [] = [];

    constructor(
      private store: Store<fromApp.AppState>
      ) {};
    
    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe []) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      // this.slService.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(newRecipe: Recipe) {
      this.recipes.push(newRecipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}