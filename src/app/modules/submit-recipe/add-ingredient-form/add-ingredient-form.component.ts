import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { combineLatest, Observable, startWith, switchMap, take, tap } from 'rxjs';
import { Category, Ingredient, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientFormComponent } from '../../submit-ingredient/ingredient-form/ingredient-form.component';
import { newRecipeIngredient, RecipeIngredient } from '../../../core/services/recipes/recipes.interface';

@Component({
  selector: 'app-add-ingredient-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, IngredientFormComponent, FormsModule],
  templateUrl: './add-ingredient-form.component.html',
  styleUrl: './add-ingredient-form.component.scss'
})
export class AddIngredientFormComponent {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredients$!: Observable<Ingredient[] | undefined>;

  public addIngredientForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0, [Validators.required]),
    subCategoryId: new FormControl(0, [Validators.required]),
    ingredient: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    unit: new FormControl("", [Validators.pattern('^[a-zA-Z]*$')]),
  })

  public get categoryIdForm(): FormControl<number> {
    return this.addIngredientForm.get('categoryId') as FormControl<number>;
  }

  public get subCategoryIdForm(): FormControl<number | undefined> {
    return this.addIngredientForm.get('subCategoryId') as FormControl<number>;
  }

  public get ingredientIdForm(): FormControl<number> {
    return this.addIngredientForm.get('ingredient') as FormControl<number>;
  }

  constructor(private _is: IngredientsService, private _rs: RecipesService) {
    this.categories$ = this._is.categories$.pipe(take(1));

    this.subcategory$ = this.addIngredientForm.get('categoryId')!.valueChanges.pipe(
      startWith(this.categoryIdForm.value),
      switchMap(categoryId => this._is.getSubCategoryByCategory(categoryId)),
      tap(subCategories => {
        if (subCategories.length === 0) {
          this.subCategoryIdForm.patchValue(undefined);
          this.subCategoryIdForm.disable();
        }
        else {
          this.subCategoryIdForm.patchValue(0);
          this.subCategoryIdForm.enable();
        }
      })
    )

    this.ingredients$ = combineLatest([
      this.categoryIdForm.valueChanges.pipe(startWith(this.categoryIdForm.value)),
      this.subCategoryIdForm.valueChanges.pipe(startWith(this.subCategoryIdForm.value))
    ]).pipe(
      switchMap(([categoryId, subCategoryId]) => this._is.getIngredientById(categoryId, subCategoryId)),
    );

    this.categoryIdForm.valueChanges.subscribe(catId => {
      this.subCategoryIdForm.patchValue(0);
      this.ingredientIdForm.patchValue(0);
    });

    this.subCategoryIdForm.valueChanges.subscribe(subCatId => {
      this.ingredientIdForm.patchValue(0);
    });

    this.addIngredientForm.valueChanges.subscribe(changes => console.log('changes', changes));

  };

  @Output() public onSubmit: EventEmitter<number> = new EventEmitter();

  submit(): void {
    if (!this.addIngredientForm.valid) return;

      const formValues = this.addIngredientForm.value;
      const newIngredientId = formValues.ingredient;

      this._rs.recipeIngredients$.pipe(take(1)).subscribe(ingredients => {
        const ingredientExists = ingredients.some(ingredient => ingredient.ingredientId === newIngredientId);
  
        if (ingredientExists) {
          console.log('Ingredient already exists in the recipe.');
          return;
        }

      const newRecipeIngredient: RecipeIngredient = {
        recipeId: this._rs.getNextRecipeId(),
        ingredientId: formValues.ingredient,
        amount: formValues.amount,
        unit: formValues.unit
      }

      console.log('New Recipe Ingredient:', newRecipeIngredient);
      console.log('All Recipe Ingredients:', this._rs.recipeIngredients);
      this._rs.addRecipeIngredient(newRecipeIngredient);

      this.onSubmit.emit(this.addIngredientForm.value['ingredient'])
    });
  }
}
