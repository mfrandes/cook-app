import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipee-book-3ed11.firebaseio.com/recipes.json', recipes).subscribe(() => {
            console.log(recipes);

        })
    }
    fetchRecipes() {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>(
                    'https://ng-recipee-book-3ed11.firebaseio.com/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}

/* take is a oprerator that allows us to subscribe to a event a number of times, in this case one time and than it unsubscribes automaticly */
/* exhaustMap it waits for teh first observabele to compleet and aftere it gives us the user ... */

/* Resolving Data Before Loading
--> from recipe-resolve.ts
    we have to add the tap operator need import, this allows us to execute code in ower hhtp request without alterig the data that tunneled trought that observabele,
    we will not subscribe here enimore, instead we need to to return and subscribe were we need to (ex. header.component)
after subscribing --> recipe-resolver.service.ts
*/