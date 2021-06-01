import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe',
          'This is a test recipe',
          'https://cookieandkate.com/images/2018/12/pomegranate-pear-arugula-salad-recipe-2.jpg'
        ),
        new Recipe(
          'Another Test Recipe',
          'This is a test recipe',
          'https://cookieandkate.com/images/2018/12/pomegranate-pear-arugula-salad-recipe-2.jpg'
        ),
      ];

    selectedRecipe = new EventEmitter<Recipe>();
    
    getRecipes() {
        return this.recipes.slice();
    }      

    
}