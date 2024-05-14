import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Category, SubCategory } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule, IngredientDetailsComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  category$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;

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

  // Although no errors, the subcategory is not handling properly. It is displaying the subcategoires for the default category, but shows nothing on change of category
  constructor(private _is: IngredientsService) {
    this.category$ = this._is.categories$;
    //The issue may be happening somewhere below here, as the form correctly starts defaulted to form control 0. Once the category is changed is when the subcategory becomes unresponsive
    this.subcategory$ = this._categoryIdForm.valueChanges.pipe(
      startWith(this._categoryId),
      switchMap(categoryId => this._is.getSubCategoryByCategory(categoryId)),
      tap(subCategories => {
        if (subCategories.length === 0) {
          this._subCategoryIdForm.patchValue(undefined);
          this._subCategoryIdForm.disable();
        }
        else {
          this._subCategoryIdForm.enable();
        }
      })
    );
  }


}

