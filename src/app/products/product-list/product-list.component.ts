import { Component, OnInit } from '@angular/core';
import { IProduct } from './../model/product';
import { ProductService } from '../services/product.service';

@Component ({
  //selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filterProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.listFilter = '';
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List: " + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filterProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
}
