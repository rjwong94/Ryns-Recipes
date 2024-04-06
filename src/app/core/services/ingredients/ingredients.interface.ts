export interface Ingredient {
  id: number;
  name: string;
  categoryID: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory extends Category {
  id: number;
  name: string;
  categoryID: number;
}



