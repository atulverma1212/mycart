import { Product } from "./Product";

export class CartProduct {
        id: number
        name: String
        price: number
        url: String
        amount: number;

        constructor(id: number, name: String, price: number, url: String, amount: number) {
            this.amount = amount;
            this.url = url;
            this.id = id;
            this.name = name;
            this.price = price;
        }

        static fromProduct(product: Product, amount: number): CartProduct {
            return new CartProduct(product.id, product.name, product.price, product.url, amount);
        }
}