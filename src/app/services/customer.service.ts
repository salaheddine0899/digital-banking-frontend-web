import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.HOST_BACKEND+"/customers");
  }

  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.HOST_BACKEND+"/customers/search?keyword="+keyword);
  }

  public saveCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.HOST_BACKEND+"/customers",customer);
  }

  public deleteCustomer(id:number){
    return this.http.delete(environment.HOST_BACKEND+"/customers/"+id);
  }
}
