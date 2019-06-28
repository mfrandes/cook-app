import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bbcgoodfood.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fcategory_retina%2Fpublic%2Frecipe-collections%2Fcollection-image%2F2013%2F05%2Fnext-level-fish-pie.jpg%3Fitok%3DNDSAapTQ&imgrefurl=https%3A%2F%2Fwww.bbcgoodfood.com%2Frecipes%2Fcategory%2Fdishes&docid=H-lSPnHKJkIbXM&tbnid=nGHuuBd0wNCkfM%3A&vet=10ahUKEwi0xYfTw4zjAhXHxoUKHWinDGQQMwhTKBEwEQ..i&w=410&h=370&bih=1008&biw=1920&q=recipe%20food&ved=0ahUKEwi0xYfTw4zjAhXHxoUKHWinDGQQMwhTKBEwEQ&iact=mrc&uact=8')
  ]
  constructor() { }

  ngOnInit() {
  }

}
