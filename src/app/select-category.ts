import { Injectable} from "@angular/core";
import { INGREDIENTS } from "./stored-ingredients";

@Injectable()
export class SelectCategory {
  getCategories() {
    INGREDIENTS.forEach(element => {
      return element;
    });
  }
}