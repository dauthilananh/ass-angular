import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.getProduct();
  }
  getProduct(){
    this.route.params.subscribe(param => {
        console.log(param);
        this.productService.getProduct(param.id).subscribe(data => {
            this.product = data;
        })
    })
}

}
