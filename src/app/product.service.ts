import { Injectable } from '@angular/core';
// import { MockData } from './MockData';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  // products: Product[] = MockData;
  API: string = 'https://60f780d49cdca00017454e7e.mockapi.io/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }
  getProduct(id: number): Observable<Product>{
    console.log(id);
    return this.http.get<Product>(`${this.API}/${id}`)
  }

  getInfo(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }
  addProduct(item: Product): Observable<Product> {
    return this.http.post<Product>(this.API, item);
  }
  removeProduct(id: Number): Observable<Product> {
    return this.http.delete<Product>(`${this.API}/${id}`);
  }
  updateProduct(item: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${item.id}`, item);
  }
}
