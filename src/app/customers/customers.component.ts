import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers$! : Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup :FormGroup | undefined;
  constructor(private customerService:CustomerService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleGetCustomers();
  }

  handleGetCustomers(){
    /*this.customerService.getCustomers().subscribe({
      next:(data)=>{
        this.customers=data;
      },error:(err)=>{
        this.errorMessage=err.message;
      }
    });*/
    this.customers$=this.customerService.getCustomers().pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      }),

    );
  }

  handleSearchCustomers() {
    this.customers$=this.customerService.searchCustomers(this.searchFormGroup?.value.keyword).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      }),
    );
  }

  handleDeleteCustomer(customer: Customer) {
    let conf= confirm("Are you sure to delete this customer?");
    if(conf) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: (data) => {
          this.customers$ = this.customers$.pipe(map(data => {
            let index = data.indexOf(customer);
            data.slice(index, 1);
            return data;
          }));
        }
      });
    }
  }
}
