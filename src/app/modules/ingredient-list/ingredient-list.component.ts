import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule, IngredientDetailsComponent, ReactiveFormsModule, AsyncPipe, FormsModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  category$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredient$!: Observable<Ingredient[] | undefined>;
  currentCategoryId: number;
  currentSubCategoryId!: number;

  public categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0),
    subCategoryId: new FormControl(0),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.categoryForm.get('categoryId') as FormControl<number>;
  }

  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.categoryForm.get('subCategoryId') as FormControl<number | undefined>;
  }

  private get _categoryId(): number {
    return this._categoryIdForm?.value;
  }

  constructor(private _is: IngredientsService) {
    this.category$ = this._is.categories$;
    this.subcategory$ = this._categoryIdForm.valueChanges.pipe(
      startWith(this._categoryId),
      switchMap(categoryId => this._is.getSubCategoryByCategory(categoryId)),
      tap(subCategories => {
        if (subCategories.length === 0) {
          this._subCategoryIdForm.patchValue(undefined);
          this._subCategoryIdForm.disable();
        }
        else {
          this._subCategoryIdForm.patchValue(0);
          this._subCategoryIdForm.enable();
        }
      })
    )

    this.ingredient$ = this.categoryForm.valueChanges.pipe(
      startWith(this.categoryForm),
      switchMap(value => this._is.getIngredientById(value.categoryId, value.subCategoryId!)),
    );
  }


}

