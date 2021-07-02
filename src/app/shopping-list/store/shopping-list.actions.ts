import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient {

    readonly type = ADD_INGREDIENT;
    // payload: Ingredient
    constructor(public payload: Ingredient) {}

}

export class AddIngredients {
 
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;