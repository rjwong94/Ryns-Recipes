import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [NgFor],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {
  INGREDIENTS = [];
  categorySelect() {
    let cat = 'Meats, Poultry, and Seafood';
    let e = document.getElementById('cat-drop') as HTMLSelectElement;
    cat = e.options[e.selectedIndex].value;
    console.log(cat);
  }
}


