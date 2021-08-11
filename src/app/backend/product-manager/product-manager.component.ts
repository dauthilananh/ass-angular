import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  products: Product[];
  data: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  // removeItem(id: number) {
  //   this.productService.removeProduct(id).subscribe(data => {
  //     this.products = this.products.filter(item => item.id != data.id);
  //   });
  // }
  removeItem(id: number) {
    this.productService.removeProduct(id).subscribe(data => {
        const question =window.confirm('Bạn có chắc muốn xóa không?');
    if(question){
        this.products = this.products.filter(item => item.id != data.id);
    }
      
    });
  }

}
