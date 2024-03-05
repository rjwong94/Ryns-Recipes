import { Ingredient } from "./ingredients";

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  amount: number[];
  unit: string[];
  steps?: string[];
}
