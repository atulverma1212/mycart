import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
   }

  getProducts(): Observable<Product[]> {
  //TODO: Fetch the product list from the API -- done
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': environment.authToken };
  return this.http.get<Product[]>("http://localhost:8080/product/", {headers});
  }

  getProductById(id: string): Observable<Product> {
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': environment.authToken };
    return this.http.get<Product>("http://localhost:8080/product/" + id, {headers});
    }
}
