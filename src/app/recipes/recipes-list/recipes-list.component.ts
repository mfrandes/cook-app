import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRkEbtobQJFiRXOQR1jKIXw5R3QhqlQP9AAjFniJk6qagnchv1w'),
    new Recipe('Anothere test Recipe', 'This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRkEbtobQJFiRXOQR1jKIXw5R3QhqlQP9AAjFniJk6qagnchv1w')
  ]
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe: Recipe){
  this.recipeWasSelected.emit(recipe);
  }
}
