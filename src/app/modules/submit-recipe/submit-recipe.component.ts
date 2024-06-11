import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { Category, SubCategory } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-submit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './submit-recipe.component.html',
  styleUrl: './submit-recipe.component.scss'
})
export class SubmitRecipeComponent {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;

  public recipeForm: FormGroup = new FormGroup ({
    recipeName: new FormControl('', [Validators.required]),
    categoryId: new FormControl(0,[Validators.required]),
    subCategoryId: new FormControl(0,[Validators.required]),
  })

  private get _categoryIdForm(): FormControl<number> {
    return this.recipeForm.get('categoryId') as FormControl<number>;
  }

  private get _categoryId(): number {
    return this._categoryIdForm?.value;
  }

  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.recipeForm.get('subCategoryId') as FormControl<number>;
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
}
