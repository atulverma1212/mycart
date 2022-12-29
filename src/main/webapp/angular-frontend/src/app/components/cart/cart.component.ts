import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Order } from '../../models/Order';
import { CartProduct } from 'src/app/models/CartProduct';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any;
  total: number = 0;
  customerName: string = '';
  customerAddress: string = '';
  customerCreditCard: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
    this.total = this.getCartTotal(this.cartProducts);
  }

  getCartTotal(cart: any): number {
    let sum = 0;
    let arr = (cart as unknown) as CartProduct[]
    arr.forEach(i => {
      sum += i.price * i.amount;
    });
    return Math.round((sum) * 100) / 100;
  }

  modelChanged(product: any): void {
    const productInCart = this.cartProducts.find((cartProduct: any) => cartProduct.id === product.id);

    if (product.amount === 0) {
      let updatedCart = this.cartProducts.filter((cartProduct: any) => cartProduct.id !== product.id);
      this.cartProducts = this.cartService.updateCart(updatedCart);
      alert('Removed from cart!');
    }

    productInCart.amount = product.amount;

    this.total = this.getCartTotal(this.cartProducts);
  }

  onSubmit() {
    let order: Order = new Order();
    order.name = this.customerName;
    order.price = this.total;
    order.address = this.customerAddress;

    //TODO: Submit order - call the service -- done
    this.cartService.submitOrder(order).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      alert('There was an error submitting request');
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
    }))
      .subscribe(data => {
        console.log("Order submitted succcessfully");
      });

    this.cartService.clearCart();
    this.cartProducts = [];
    this.router.navigate(['/confirmation', { customerName: this.customerName, total: this.total }]);
  }

  // util
  allowOnlyNumbers(event: any): boolean {
    const characterCode = (event.which) ? event.which : event.keyCode;
    return (characterCode > 31 && (characterCode < 48 || characterCode > 57)) ? false : true;
  }
}
