import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipee-book-3ed11.firebaseio.com/recipes.json', recipes).subscribe(() => {
            console.log(recipes);

        })
    }
    fetchRecipes() {
        this.http
            .get<Recipe[]>('https://ng-recipee-book-3ed11.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients :[]};
                });
            }))
            .subscribe(
                (recipe: Recipe[]) => {
                    this.recipeService.setRecipes(recipe);
                }
            );
    }
}