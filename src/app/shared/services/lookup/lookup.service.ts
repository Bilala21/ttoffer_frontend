import { response } from 'express';
import { Injectable } from '@angular/core';
import { productCondition } from '../../Models/Product/productCondition';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { category } from '../../Models/Product/category';
import { subCategory } from '../../Models/Product/SubCategory';
import { Bid } from '../../Models/Product/Bid';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private rootURL = ''
  constructor(    private http: HttpClient
  ) {
    this.rootURL = 'https://www.ttoffer.com/backend/public/api';
  }


    /**
* get list of product condition options
* @returns {productCondition} moomentsInitiateResponse - retrun initiate response
*/
async GetProductConditionOptions(): Promise<productCondition[]> {
  var url = this.rootURL + '/condition';
  var response = await firstValueFrom(
    this.http.get<productCondition[]>(url)
  );
  return response as productCondition[];
}
    /**
* get product categories
* @returns {productCondition} productCondition - retrun list of categories
*/
async GetProductCategories(): Promise<category[]> {
  var url = this.rootURL + '/category/show';
  var response = await firstValueFrom(
    this.http.get<category[]>(url)
  );
  return response as category[];
}
    /**
* get product categories
* @param {number} id - some  id
* @returns {subCategory} productCondition - retrun list of categories
*/
async GetProductSubCategories(id:number): Promise<subCategory[]> {
  var url = this.rootURL + '/sub-category/show/'+id;
  var response = await firstValueFrom(
    this.http.get<subCategory[]>(url)
  );
  return response as subCategory[];
}
// Method to fetch bids based on the product ID
async GetBidListByProduct(page: number): Promise<Bid[]> {
  const url = `${this.rootURL}/placed-bids?page=${page}`;
  const response = await firstValueFrom(
    this.http.post<any>(url,{product_id: 783})  // You can replace 'any' with a more specific response model if needed
  );
  return response.data as Bid[];
}
}
