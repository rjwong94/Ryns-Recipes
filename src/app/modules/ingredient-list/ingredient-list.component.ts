import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, SubCategory } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { Observable, startWith, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule, IngredientDetailsComponent, ReactiveFormsModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  category$: Observable<Category[]>;
  subcategory$: Observable<SubCategory[] | undefined>;

  public categoryForm: FormGroup = new FormGroup ({
    categoryId: new FormControl(0),
    subCategoryId: new FormControl(0),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.categoryForm.get('categoryId') as FormControl<number>;
  }

  // Although no errors, the subcategory is not handling properly. It is displaying the subcategoires for the default category, but shows nothing on change of category
  constructor(private _is: IngredientsService) {
    this.category$ = this._is.categories$;
    this.subcategory$ = this._categoryIdForm.valueChanges.pipe(
      startWith(this._categoryIdForm.value),
      switchMap(categoryId => this._is.getSubCategoryByCategory(categoryId)),
    );
  }


}

