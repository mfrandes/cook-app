import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

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
        return this.http
            .get<Recipe[]>('https://ng-recipee-book-3ed11.firebaseio.com/recipes.json')
            .pipe
                (map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients :[]
                    };
                });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}

/* Resolving Data Before Loading 
--> from recipe-resolve.ts
    we have to add the tap operator need import, this allows us to execute code in ower hhtp request without alterig the data that tunneled trought that observabele, 
    we will not subscribe here enimore, instead we need to to return and subscribe were we need to (ex. header.component)
after subscribing --> recipe-resolver.service.ts
*/