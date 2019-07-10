import { Component, OnInit, ElementRef, ViewChild,} from '@angular/core';
import { Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class SoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }
  onAddItem() {
    const ingName: string = this.nameInputRef.nativeElement.value;
    const amountName: number = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, amountName);
    this.slService.ingredientAdded(newIngredient);
  }
}
