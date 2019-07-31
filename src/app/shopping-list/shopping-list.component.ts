import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    /*
    this.ingredients = this.slService.getIngredient();
    this.igChangeSub = this.slService.ingredientsChanges.subscribe(
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    ) This code is no longer required
    this.loggingService.printLog('Hello fom shopping list')*/
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy(){

    //this.igChangeSub.unsubscribe()
  }
}
  