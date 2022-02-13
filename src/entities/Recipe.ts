import { Product } from "./Product";

export class Recipe {
  name: string;
  products: Product[];
  text: string;

  constructor(name: string) {
    this.name = name;
    this.products = [];
    this.text = "";
  }
}
