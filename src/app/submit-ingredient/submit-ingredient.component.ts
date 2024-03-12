import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SelectCategory } from '../select-category';
import { Ingredient } from '../ingredients';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {  
  categorySelect() {
    let cat = 'Meats, Poultry, and Seafood';
    let e = document.getElementById('cat-drop') as HTMLSelectElement;
    cat = e.options[e.selectedIndex].value;
    console.log(cat);
  }
}


