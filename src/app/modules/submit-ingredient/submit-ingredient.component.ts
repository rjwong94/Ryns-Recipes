import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';


@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, IngredientFormComponent],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {
}