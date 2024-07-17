import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { combineLatest, Observable, startWith, switchMap, tap } from 'rxjs';
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
export class AddIngredientFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredients$!: Observable<Ingredient[] | undefined>;

  public addIngredientForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0, [Validators.required]),
    subCategoryId: new FormControl(0, [Validators.required]),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.addIngredientForm.get('categoryId') as FormControl<number>;
  }

  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.addIngredientForm.get('subCategoryId') as FormControl<number>;
  }

  constructor(private _is: IngredientsService) {
    this.categories$ = this._is.categories$;

    this.subcategory$ = this.addIngredientForm.get('categoryId')!.valueChanges.pipe(
      startWith(this._categoryIdForm.value),
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

    this.ingredients$ = combineLatest([
      this._categoryIdForm.valueChanges.pipe(startWith(this._categoryIdForm.value)),
      this._subCategoryIdForm.valueChanges.pipe(startWith(this._subCategoryIdForm.value))
    ]).pipe(
      switchMap(([categoryId, subCategoryId]) => this._is.getIngredientById(categoryId, subCategoryId)),
      tap(ingredient => {
        if (ingredient && ingredient.length > 0) {
          console.log(ingredient);
        }
        else (console.log("ingredient undefined"))
      })
    )
  };

  @Output() public onSubmit: EventEmitter<Ingredient> = new EventEmitter();

  submit(): void {
  }

  ngOnInit(): void {

  }
}

