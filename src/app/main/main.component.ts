import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	productList : any;

	productIdSearch : any;

	productIdUpdate : any;				 
	productDescUpdate : any;
	productModelUpdate : any;
	productBrandUpdate : any;

	productIdDelete : any;

	productDescFilter : string;
	productModelFilter : string;
	productBrandFilter : string;

	errorMessage : any;

	testCase : any;
	testResult : any;

  constructor(
  	public productService : ProductService) { }

  ngOnInit() {
  }


  public getAllProducts() : void {
      this.productService.getAllProducts("none", "none").subscribe(
        data => {
          this.productList = data;
        },
        err => {
          this.errorMessage = err;
        })
  }

  public getAllProductsFilter() : void {

      if (this.productDescFilter.length != 0){
        this.productService.getAllProducts("desc", this.productDescFilter).subscribe(
          data => {
            this.productList = data;
          },
          err => {
            this.errorMessage = err;
          })
      }
      else if (this.productModelFilter.length != 0){
    		this.productService.getAllProducts("model", this.productModelFilter).subscribe(
    			data => {
    				this.productList = data;
    			},
    			err => {
    				this.errorMessage = err;
    			})
        }
      else if (this.productBrandFilter.length != 0){
        this.productService.getAllProducts("brand", this.productBrandFilter).subscribe(
          data => {
            this.productList = data;
          },
          err => {
            this.errorMessage = err;
          })
        }
      else{
        this.productService.getAllProducts("none", "none").subscribe(
        data => {
          this.productList = data;
        },
        err => {
          this.errorMessage = err;
        })
      }
  }

  public productSearch() : void {
  		this.productService.getProduct(this.productIdSearch).subscribe(
  			data => {
  				this.productList = [data];
  			},
  			err => {
  				this.errorMessage = err;
  			})
  }

  public addProduct() : void {

  	let product : Object = { 
  		id: this.productIdUpdate,
  		description: this.productDescUpdate,
  		model: this.productModelUpdate,
  		brand: this.productBrandUpdate }

  	this.productService.addProduct(product).subscribe(
  			data => {
  				this.productList = [data];
  			},
  			err => {
  				this.errorMessage = err;
  			})
  }

  public updateProduct() : void {

  	let product : Object = { 
  		id: this.productIdUpdate,
  		description: this.productDescUpdate,
  		model: this.productModelUpdate,
  		brand: this.productBrandUpdate }

	this.productService.updateProduct(product).subscribe(
			data => {
				this.productList = [data];
			},
			err => {
				this.errorMessage = err.message;
			})
  }

  public deleteProduct() : void {
  	this.productService.deleteProduct(this.productIdDelete).subscribe(
  		data => {
				this.productList = data;
			},
			err => {
				this.errorMessage = err;
			})  
  }

  public test1() : void {
    this.testResult = "";
  	this.testCase = "Creates a new Product and checks that it doesn't exist";
  	this.productService.test(1).subscribe(
  		data => {
  			this.productList = [data];
        this.testResult = "Product Created"
  		},
  		err => {
  			this.testResult = err;
  		});
  }

  public test2() : void {
    this.testResult = "";
  	this.testCase = "Inserts this new product into the table and checks that the data inserted is the same"
  	this.productService.test(2).subscribe(
  		data => {
        this.getAllProducts();
        this.testResult = "Product Inserted"
  		},
  		err => {
  			this.testResult = err;
  		});
  }

  public test3() : void {
    this.testResult = "";
  	this.testCase = "Updates the Product and checks it is updated correctly in the table"
  	this.productService.test(3).subscribe(
  		data => {
        this.getAllProducts();
        this.testResult = "Product Altered"
  		},
  		err => {
  			this.testResult = err;
  		});
  }

  public test4() : void {
    this.testResult = "";
  	this.testCase = "Deletes the Product and checks it no longer exists"
  	this.productService.test(4).subscribe(
  		data => {
  			this.testResult = "Click all products to check it is deleted"
  		},
  		err => {
  			this.testResult = "Click all products to check it is deleted";
  		});
  }

}
