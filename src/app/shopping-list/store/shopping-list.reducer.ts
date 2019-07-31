
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppinglistActions from './shoppinglist.actions';


const initialState = {
    ingredients: [new Ingredient('Appels', 5), new Ingredient('Tomato', 2)]
};

export function shoppingListReducer(state = initialState, action : ShoppinglistActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppinglistActions.ADD_INGREDIENT:
            return {
                ...state, //this copies the old state this is a good practice 
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppinglistActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        default:
            return state;
    }
}
