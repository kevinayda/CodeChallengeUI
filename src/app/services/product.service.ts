import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, BaseRequestOptions, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
    template: '',
    providers: [
      BaseRequestOptions,
      Http
    ]
})
  

@Injectable()
export class ProductService {

	private baseUrl : string = "./api/";
	private options : any;

	constructor(
    private http: Http){
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	this.options = new RequestOptions({ headers: headers});
    }

	getAllProducts(filterType, filterValue) : any{

		if (filterType == "none"){
			let URL = this.baseUrl + "products"
			return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
		}
		else if (filterType == "desc"){
			let URL = this.baseUrl + "products?description=" + filterValue
			return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
		}
		else if (filterType == "model"){
			let URL = this.baseUrl + "products?model=" + filterValue
			return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
		}
		else if (filterType == "brand"){
			let URL = this.baseUrl + "products?brand=" + filterValue
			return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
		}
	}

	addProduct(product) : any{
		let URL = this.baseUrl + "products";
		return this.http.post(URL, product).pipe(map((res: Response) => res.json()));
	}

	getProduct(id) : any{
		let URL = this.baseUrl + "products/" + id;
		return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
	}

	updateProduct(product) : any{
		let URL = this.baseUrl + "products/" + product.id;
		return this.http.put(URL, product).pipe(map((res: Response) => res.json()));
	}

	deleteProduct(id) : any{
		let URL = this.baseUrl + "products/" + id;
		return this.http.delete(URL, this.options).pipe(map((res: Response) => res.json()));
	}

	test(testId) : any{
		let URL = this.baseUrl + "test/test" + testId;
		return this.http.get(URL, this.options).pipe(map((res: Response) => res.json()));
	}
}