import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
})
export class RecipesModule { }