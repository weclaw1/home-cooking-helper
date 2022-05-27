import { reactive } from "vue";
import { Product } from "../entities/Product";

export const shoppingListProductsStore = {
  state: reactive({
    shoppingListProducts: loadFromLocalStorage(),
  }),

  find(productName: string): Product | undefined {
    return this.state.shoppingListProducts.find(
      (product) => product.name === productName
    );
  },

  addProduct(product: Product) {
    if (this.containsProduct(product.name)) {
      throw new Error(
        `Shopping list products list already contains product with name ${product.name}`
      );
    }
    this.state.shoppingListProducts.push(product);
    saveToLocalStorage(this.state.shoppingListProducts);
  },

  deleteProduct(productName: string) {
    const productIndex = this.state.shoppingListProducts.findIndex(
      (product) => product.name === productName
    );
    if (productIndex < 0) {
      throw new Error(
        `Shopping list products list does not contain product with name: ${productName}`
      );
    }
    this.state.shoppingListProducts.splice(productIndex, 1);
    saveToLocalStorage(this.state.shoppingListProducts);
  },

  updateProduct(productName: string, product: Product) {
    const productIndex = this.state.shoppingListProducts.findIndex(
      (product) => product.name === productName
    );
    if (productIndex < 0) {
      throw new Error(
        `Shopping list products list does not contain product with name: ${productName}`
      );
    }
    this.state.shoppingListProducts[productIndex] = product;
    saveToLocalStorage(this.state.shoppingListProducts);
  },

  containsProduct(productName: string): boolean {
    return this.state.shoppingListProducts.some(
      (product) => product.name === productName
    );
  },

  clear() {
    this.state.shoppingListProducts = [];
    saveToLocalStorage(this.state.shoppingListProducts);
  },
};

function loadFromLocalStorage(): Product[] {
  const localStorageShoppingListProducts = localStorage.getItem(
    "shoppingListProducts"
  );
  if (localStorageShoppingListProducts !== null) {
    return JSON.parse(localStorageShoppingListProducts);
  }
  return [];
}

function saveToLocalStorage(shoppingListProducts: Product[]) {
  window.localStorage.setItem(
    "shoppingListProducts",
    JSON.stringify(shoppingListProducts)
  );
}
