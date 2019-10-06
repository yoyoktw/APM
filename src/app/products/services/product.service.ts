import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProduct } from "../model/product";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = "http://localhost:3000/products";
    private productByIdUrl = "http://localhost:3000/products?productId=";

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => JSON.stringify(data)), 
            catchError(this.handleError)
        );
    }

    // getProducts(): Observable<IProduct[]>{
    //     return this.http.get<IProduct[]>(this.productUrl).pipe(
    //         tap(data => console.log("All: " + JSON.stringify(data))), 
    //         catchError(this.handleError)
    //     );
    // }

    getProductById(id: number): Observable<IProduct | undefined> {
        return this.http.get<IProduct>(this.productByIdUrl+id).pipe(
            tap(data => JSON.stringify(data)), 
            catchError(this.handleError)
        );
    }

    //// Without Calling
    // getProduct(id: number): Observable<IProduct | undefined> {
    //     return this.getProducts().pipe(
    //       map((products: IProduct[]) => products.find(p => p.productId === id))
    //     );
    // }
    
    private handleError(err: HttpErrorResponse){
        let errorMessage = "";
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
    }
}