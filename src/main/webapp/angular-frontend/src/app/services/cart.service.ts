import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { CartProduct } from '../models/CartProduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: CartProduct[] = [];

  constructor(private http: HttpClient) { }

  getCartProducts() {

    return this.cartProducts;
  }

  addToCart(product: CartProduct, amount: number) {

    //TODO: Add item to the cart -- done
    let existingProduct = this.cartProducts.filter(x => x.id == product.id);
    if(existingProduct.length > 0){
      existingProduct[0].amount += amount;
    }else{
      this.cartProducts.unshift(product);
    }
    alert('Added to cart!');
  }
  clearCart() {
    this.cartProducts = [];
    return this.cartProducts;
  }

  updateCart(cart: any) {
    this.cartProducts = cart;

    return this.cartProducts;
  }

  submitOrder(order: Order): Observable<any> {
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': environment.authToken };
    const body=JSON.stringify(order);
    return this.http.post("http://localhost:8080/orders/submit", body, {headers});
  }
}
