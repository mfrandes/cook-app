import { Component, OnInit, } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }
  get ingredients(){
    return this.recipe.ingredients
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onSendToShppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo: this.route}); best solution
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}) // complex solution
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
