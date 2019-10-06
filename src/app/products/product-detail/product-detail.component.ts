import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  errorMessage: string;

  product: IProduct;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.pageTitle += `: ${id}`;
    this.productService.getProductById(id).subscribe(
      products => {
        this.product = products[0];
      },
      error => this.errorMessage = <any>error
    );
    
    // this.product = {
    //   "productId": 2,
    //   "productName": "Garden Cart",
    //   "productCode": "GDN-0023",
    //   "releaseDate": "March 18, 2016",
    //   "description": "15 gallon capacity rolling garden",
    //   "price": 32.99,
    //   "starRating": 4.2,
    //   "imageUrl": "http://clipart-library.com/images/8iAoEXRrT.png"      
    // }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
