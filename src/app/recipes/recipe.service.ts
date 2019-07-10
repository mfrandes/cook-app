import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    constructor(private slService: ShoppingListService){}
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
            'A super tasty Schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger',
            'Do you need to say enithing?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ])
    ]

    getRecipes() {
        return this.recipes.slice();
    }
    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }
}