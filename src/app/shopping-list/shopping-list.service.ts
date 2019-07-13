import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanges = new EventEmitter<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('Appels', 5),
        new Ingredient('Tomato', 2)
    ];
    getIngredient() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanges.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanges.emit(this.ingredients.slice())
    }
}