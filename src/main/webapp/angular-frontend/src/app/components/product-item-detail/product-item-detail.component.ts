import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { CartProduct } from 'src/app/models/CartProduct';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product | undefined;
  selectedAmount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
//TODO: Get the product description -- done
        let id : string = this.getStringValue(this.getPageId());
        this.productService.getProductById(id)
        .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          let msg : String = error.error.message;
          alert("Error: " + msg);
          this.router.navigate(["/"])
          return of();
      }))
        .subscribe(e => this.product = e);
      };
  

  addToCart(product: Product, amount: any): void {
    // const cartProductPayload  = {
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   url: product.url,
    //   amount: parseInt(amount)
    // };

    const cartProductPayload : CartProduct = CartProduct.fromProduct(product, parseInt(amount));

    this.cartService.addToCart(cartProductPayload, parseInt(amount));
  }

  // util
  getPageId(): any {
    return this.route.snapshot.paramMap.get('id');
  }

  getStringValue(value: any): string {
    return value.toString();
  }
}
