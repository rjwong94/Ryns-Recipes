import { Ingredient } from "./ingredients";

export interface Recipe {
  id: number;
  name: string;
  ingredients: number[];
  amount: number[];
  unit: string[];
  steps?: string[];
}
