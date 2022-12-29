import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { CartProduct } from 'src/app/models/CartProduct';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getProducts().pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.log("Error while fetching product list: ", error);
      alert('Error while fetching product list');
      return of();
    }))
    .subscribe(e => this.products = e);
  }

  addToCart(product: Product, amount: any): void {
    // const cartProductPayload = {
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   url: product.url,
    //   amount: parseInt(amount)
    // };

    const cartProductPayload : CartProduct = CartProduct.fromProduct(product, parseInt(amount));

    this.cartService.addToCart(cartProductPayload, parseInt(amount));
  }
}
