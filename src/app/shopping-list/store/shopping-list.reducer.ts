
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppinglistActions from './shopping-list.actions';

export interface AppState{
    shoppinglist: State
}
export interface State {
    ingredients :Ingredient[];
    editedIngredient : null;
    editedIngredietIndex: -1;
}

const initialState = {
    ingredients: [new Ingredient('Appels', 5), new Ingredient('Tomato', 2)],
    editedIngredient : null,
    editedIngredietIndex: -1
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
        case ShoppinglistActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient ={
                ...ingredient,
                ...action.payload.ingredient
            };  
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppinglistActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex)=> {
                    return igIndex !== action.payload;
                })
            };
        default:
            return state;
    }
}
