import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanges = new Subject<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('Appels', 5),
        new Ingredient('Tomato', 2)
    ];
    getIngredient() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanges.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanges.next(this.ingredients.slice())
    }
}