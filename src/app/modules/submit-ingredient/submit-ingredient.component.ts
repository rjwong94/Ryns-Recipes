import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { Observable, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;

  public ingredientForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0),
    subCategoryId: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.ingredientForm.get('categoryId') as FormControl<number>;
  }

  private get _categoryId(): number {
    return this._categoryIdForm?.value;
  }

  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.ingredientForm.get('subCategoryId') as FormControl<number>;
  }

  constructor(private _is: IngredientsService) {
    this.categories$ = this._is.categories$;

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
  };

  onSubmit() {
    if (this.ingredientForm.valid) {
      const formValues = this.ingredientForm.value;

      const newIngredient: Ingredient = {
        categoryID: formValues.categoryId,
        subcategoryID: formValues.subCategoryId,
        name: formValues.name,
        id: this._is.getNextIngredientId(),
      };

      console.log('New Ingredient', newIngredient);
      this._is.addIngredient(newIngredient);
    }

    else {console.log('Form is invalid');}
    
    // TODO: Use EventEmitter with form value
    // console.warn(this.ingredientForm.value);
  }
}


