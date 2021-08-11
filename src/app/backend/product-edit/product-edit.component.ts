import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import {Observable} from "rxjs"

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // product: Product;

  product: Product = new Product(); 
  url :string
  fb:any 
  downloadURL :Observable<string>
  constructor(
    private productService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(){
    this.getInfo();
  }

  getInfo() {
    this.ActivatedRoute.params.subscribe(params => {
      this.productService.getInfo(params.id).subscribe(data => {
        this.product = data;
      });
    });
  }
  
  onUpdateProduct() {
    this.productService.updateProduct(this.product).subscribe(data => {
      alert('Bạn đã cập nhật thành công');
      this.router.navigateByUrl('/admin/product');
    });
  }

  // upedit(event: any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //             this.product.image = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log("ở đay ", url);
  //       }
  //     });
  // }

}
