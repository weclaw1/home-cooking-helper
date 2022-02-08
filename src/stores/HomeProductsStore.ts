import { reactive } from "vue";
import { Product } from "../entities/Product";

export const homeProductsStore = {
  state: reactive({
    homeProducts: loadFromLocalStorage(),
  }),

  addProduct(product: Product) {
    if (this.containsProduct(product.name)) {
      throw new Error(
        `Home products list already contains product with name ${product.name}`
      );
    }
    this.state.homeProducts.push(product);
    saveToLocalStorage(this.state.homeProducts);
  },

  deleteProduct(productName: string) {
    const productIndex = this.state.homeProducts.findIndex(
      (product) => product.name === productName
    );
    if (productIndex < 0) {
      throw new Error(
        `Home products list does not contain product with name: ${productName}`
      );
    }
    this.state.homeProducts.splice(productIndex, 1);
    saveToLocalStorage(this.state.homeProducts);
  },

  updateProduct(productName: string, product: Product) {
    const productIndex = this.state.homeProducts.findIndex(
      (product) => product.name === productName
    );
    if (productIndex < 0) {
      throw new Error(
        `Home products list does not contain product with name: ${productName}`
      );
    }
    this.state.homeProducts[productIndex] = product;
    saveToLocalStorage(this.state.homeProducts);
  },

  containsProduct(productName: string): boolean {
    return this.state.homeProducts.some(
      (product) => product.name === productName
    );
  },
};

function loadFromLocalStorage(): Product[] {
  const localStorageHomeProducts = localStorage.getItem("homeProducts");
  if (localStorageHomeProducts !== null) {
    return JSON.parse(localStorageHomeProducts);
  }
  return [];
}

function saveToLocalStorage(homeProducts: Product[]) {
  window.localStorage.setItem("homeProducts", JSON.stringify(homeProducts));
}
