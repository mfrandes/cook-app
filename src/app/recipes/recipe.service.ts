import { Recipe } from './recipes.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A test Recipe', 'This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRkEbtobQJFiRXOQR1jKIXw5R3QhqlQP9AAjFniJk6qagnchv1w'),
        new Recipe('Anothere test Recipe', 'This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRkEbtobQJFiRXOQR1jKIXw5R3QhqlQP9AAjFniJk6qagnchv1w')
    ]

    getRecipes() {
        return this.recipes.slice();
    }
}