import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { Observable, startWith, switchMap, tap, combineLatest } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, FormsModule, NgbDropdownModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  category$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredients$!: Observable<Ingredient[] | undefined>;
  selectedCategory!: Category | undefined;

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
        console.log(subCategories, "end");
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
      switchMap(([categoryId, subCategoryId]) => this._is.getIngredientById(categoryId, subCategoryId))
    )
  }

  onSelectCategory(category: Category): void {
    this._categoryIdForm.patchValue(category.id);
    this.selectedCategory = category;
  }


}

