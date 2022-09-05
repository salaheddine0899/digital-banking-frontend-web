import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountHistory} from "../model/account.history.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Debit} from "../model/debit.model";
import {Credit} from "../model/credit.model";
import {Transfer} from "../model/transfer.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  public searchAccountHistory(accountId:string,page:number):Observable<AccountHistory>{
    let url=environment.HOST_BACKEND+"/accounts/"+accountId+"/operations?page="+page;
    return this.http.get<AccountHistory>(url);
  }

  debit(debitModel: Debit) {
    let url=environment.HOST_BACKEND+"/accounts/debit";
    return this.http.post(url,debitModel);
  }

  credit(creditModel: Credit) {
    let url=environment.HOST_BACKEND+"/accounts/credit";
    return this.http.post(url,creditModel);
  }

  transfer(transferModel : Transfer){
    let url=environment.HOST_BACKEND+"/accounts/transfer";
    return this.http.post(url,transferModel);
  }
}
