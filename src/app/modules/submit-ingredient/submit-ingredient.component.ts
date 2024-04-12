import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent implements OnInit {
  // ingredientForm = this.formBuilder.group({
  //   categorySelect: [''],
  //   subcategorySelect: [''],
  //   ingredientName: [''],
  // })


  public category: Category[] = this._is.categories;
  public subCategory: SubCategory[] = this._is.subCategories;

  ingredientForm = this.formBuilder.group({
    categorySelect: [''],
    subcategorySelect: [''],
    ingredientName: [''],
  })

  constructor(
    private _is: IngredientsService,
    private formBuilder: FormBuilder
  ) { };


  public selectCategoryID: number = 0;
  public selectSubCategoryID!: number | null;
  public ingredient: Ingredient = { id: this._is.ingredients.length, name: '', categoryID: this.selectCategoryID }


  submitted = false;

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      categorySelect: ['0'],
      subcategorySelect: [''],
      ingredientName: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    return this._is.addIngredient(this._is.ingredients, this.ingredient);
  }

  onCatSelect(value: any): void {
    value = parseFloat(value);
    this.ingredientForm.get('categorySelect')?.setValue(value);
    this.selectSubCategoryID = null;
  }

  onSubCatSelect(value: any): void {
    value = parseFloat(value);
    this.selectSubCategoryID = value;
  }

  getSubCategories(id: any): SubCategory[] {
    id = parseFloat(id);
    return this._is.getSubCategoryByCategory(id);
  }
}


