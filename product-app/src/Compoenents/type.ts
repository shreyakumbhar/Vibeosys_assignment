export type Unit =
  | "ml" | "ltr" | "gm" | "kg" | "mtr" | "mm" | "box" | "units";

export type Category = "Finished" | "Semi Finished" | "Subsidiary";

export interface Material {
  id: string;
  name: string;
  unit: Unit;
  quantity: number;
  price: number;
  totalPrice: number;
  tax: number;
  totalAmount: number;
}

export interface Product {
  id: string;
  name: string;
  unit: Unit;
  category: Category;
  expiry: string;
  materials: Material[];
  totalCost: number;
}