export enum Unit {
  Gram = "g",
  Decagram = "dg",
  Kilogram = "kg",
  Millilitre = "ml",
  Litre = "l",
}

export class Product {
  name: string;
  quantity: number;
  unit: Unit | null;
  crossed: boolean;

  constructor(name: string, quantity: number, unit: Unit | null) {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.crossed = false;
  }
}
