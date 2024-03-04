import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INGREDIENTS } from '../stored-ingredients';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  ingredients = INGREDIENTS;
}
