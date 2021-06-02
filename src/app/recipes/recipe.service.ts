import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty schnitzel - just awesome',
          'https://tse1.mm.bing.net/th?id=OIP.Uf7IpniAaFkXuHuxxcR5mgHaGi&pid=Api&P=0&w=176&h=157',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
        new Recipe(
          'Big Fat Burger',
          'What else you need to say?',
          'https://tse4.mm.bing.net/th?id=OIP.Fofqzr_KgS6BCRJHgVw-cgHaJ4&pid=Api&P=0&w=300&h=300',
        [ new Ingredient('Buns', 2), new Ingredient('Meat', 1)]),
      ];

    selectedRecipe = new EventEmitter<Recipe>();
    
    getRecipes() {
        return this.recipes.slice();
    }      

    
}