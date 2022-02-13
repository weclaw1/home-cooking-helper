import { Units } from "../convert";

export enum Unit {
  Pieces = "pcs",
  Grams = "g",
  Decagrams = "dg",
  Kilograms = "kg",
  Millilitres = "ml",
  Litres = "l",
}

export class Product {
  name: string;
  quantity: number;
  unit: Units;
  crossed: boolean;

  constructor(name: string, quantity: number, unit: Units) {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.crossed = false;
  }
}
