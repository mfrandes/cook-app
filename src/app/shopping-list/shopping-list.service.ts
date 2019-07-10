import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';


export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()
    private ingredients: Ingredient[] = [
        new Ingredient('Appels', 5),
        new Ingredient('Tomato', 2)
    ];
    getIngredients(){
        return this.ingredients.slice()
    }
    ingredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    addIngredients(ingredients: Ingredient[]){
        //for(let ingredient of ingredients){
         //   this.ingredientAdded(ingredient) //Clasic method
        //}
        this.ingredients.push(...ingredients); // pushing the array splited in single elements with '...'
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}