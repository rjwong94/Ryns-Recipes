import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { BehaviorSubject, Observable, startWith, switchMap, tap } from 'rxjs';
import { Category, Ingredient, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientFormComponent } from '../../submit-ingredient/ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-add-ingredient-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, IngredientFormComponent],
  templateUrl: './add-ingredient-form.component.html',
  styleUrl: './add-ingredient-form.component.scss'
})
export class AddIngredientFormComponent {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredients$!: Observable<Ingredient[] | undefined>;
  recipeIngredients!: Ingredient[] | undefined;
  _recipeIngredients$: BehaviorSubject<Ingredient[] | undefined> = new BehaviorSubject(this.recipeIngredients);
  recipeIngredients$: Observable<Ingredient[] | undefined> = this._recipeIngredients$.asObservable();

  public addIngredientForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0, [Validators.required]),
    subCategoryId: new FormControl(0, [Validators.required]),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.addIngredientForm.get('categoryId') as FormControl<number>;
  }

  private get _categoryId(): number {
    return this._categoryIdForm?.value;
  }

  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.addIngredientForm.get('subCategoryId') as FormControl<number>;
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

    this.ingredients$ = this.addIngredientForm.valueChanges.pipe(
      startWith(this.addIngredientForm),
      switchMap(value => this._is.getIngredientById(value.categoryId, value.subCategoryId!))
    )
  };

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.addIngredientForm.valid) {
      // this.recipeIngredients?.push(this.addIngredientForm.value.selectedIngredient);
      //   console.log(this.addIngredientForm.value.selectedIngredient.name);
      console.warn(this.addIngredientForm.value);
    }
    else { console.log('Form is invalid'); }
  }
}

