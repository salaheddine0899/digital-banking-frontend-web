import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {map, Observable} from "rxjs";
import {CustomerAccounts} from "../model/customer-accounts.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId!:number;
  customerAccounts$! : Observable<CustomerAccounts>;
  totalPages!:number;
  currentPage:number=0;
  constructor(private route:ActivatedRoute,
              private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customerId=parseInt(atob(this.route.snapshot.params?.['id']));
    this.getCustomerAccounts();
  }

  getCustomerAccounts(){
    this.customerAccounts$ = this.customerService.getCustomerAccounts(this.customerId,this.currentPage).pipe(map((data)=>{
      this.totalPages=data.totalPages;
      this.currentPage=data.currentPage;
      return data;
    }));
  }

  handleGoToPage(page: number) {
    this.currentPage=page;
    this.getCustomerAccounts();
  }
}
