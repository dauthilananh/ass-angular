import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import {Observable} from "rxjs"
import { map, finalize } from "rxjs/operators";
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product(); 
  url :string
  fb:any 
  downloadURL :Observable<string>
  constructor(
    private productService: ProductService,
    private router: Router,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(){
    
  }
  onAddProduct() {  
    this.productService.addProduct(this.product).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/admin/product');
    });
  }
  //ảnh
  upload(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.product.image = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("ở đay ", url);
        }
      });
  }

}
