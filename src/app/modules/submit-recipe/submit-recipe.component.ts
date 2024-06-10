import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './submit-recipe.component.html',
  styleUrl: './submit-recipe.component.scss'
})
export class SubmitRecipeComponent {
  public recipeForm: FormGroup = new FormGroup ({
    recipeName: new FormControl('', [Validators.required]),

  })
}
