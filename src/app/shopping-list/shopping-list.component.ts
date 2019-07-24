import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.igChangeSub = this.slService.ingredientsChanges.subscribe(
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    )
    this.loggingService.printLog('Hello fom shopping list')
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe()
  }
}
  