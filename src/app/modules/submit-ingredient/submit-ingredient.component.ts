import { Component} from '@angular/core';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';


@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [IngredientFormComponent],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {
}