import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shoppinglist.actions';


const initialState = {
    ingredients: [
        new Ingredient('Appels', 5),
        new Ingredient('Tomato', 2)
    ]
};

export function shoppingListReducer(state = initialState, action : Action) {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state, //this copies the old state this is a good practice 
                ingredients: [...state.ingredients, action]
            }
    }
}