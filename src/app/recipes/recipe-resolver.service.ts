import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes(); 
    } else {
      return recipes;
    }
    /*we don"t need to suscribe, the resolver will subscribe for me */
  }

}
/* Resolving Data Before Loading 
we create a normal service file,
Needs to implement the Resolve interface we need to import, this is a generic inraface and we need to specifi the type of data, 
we need to inject the data storage need import,
we are force to have a resolve method, this gets data about the route and witch gets the current router state from there we can get iformations like id and such, but here we are interested to load all data sow we don"t the id
The goal is to return eather a array of recipes witch we can"t becouse we need to load them first or a observable that will ieald in the end a array of recipes this we can offer
--> data-storage.ts
--> bach here 
we will return fetchRecipe from dataStastorege we need no subscribe resolver will subscribe for us
We need to apply the resolve in app-routing.module.ts
*/

/* Fixing a Bug with the Resolver
if we fetch recipes and we edit we cant save them, this is a fix
solution is to check if we have recipes and fetch new only if we don't:
inject recipesService, after theat we can get the recepes from service and we can check if we have with a if
*/