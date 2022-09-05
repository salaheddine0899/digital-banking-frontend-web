import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {AccountHistory} from "../model/account.history.model";
import {Debit} from "../model/debit.model";
import {Credit} from "../model/credit.model";
import {Transfer} from "../model/transfer.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  searchAccountFormGroup!: FormGroup;
  accountHistory$! : Observable<AccountHistory>;
  currentPage : number=0;
  operationFormGroup! : FormGroup;
  accountId! : string;
  errorMessage! : string;
  constructor(private fb:FormBuilder,private accountService:AccountService) { }

  ngOnInit(): void {
    this.initSearchFormGroup();
  }

  initSearchFormGroup(){
    this.searchAccountFormGroup=this.fb.group({
      accountId:this.fb.control("")
    });
    this.initOperationFormGroup();
  }

  initOperationFormGroup(){
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(""),
      accountDestination:this.fb.control("")
    });
  }

  handleSearchAccount() {
    this.accountId = this.searchAccountFormGroup.value.accountId;
    this.accountHistory$=this.accountService.searchAccountHistory(this.accountId,this.currentPage).pipe(map((data=>{
      this.currentPage=data.currentPage;
      return data;
    })),catchError((err)=>{
      this.errorMessage=err.error.message;
      return throwError(err);
    }));
  }

  handleChangePage(index: number) {
    this.currentPage=index;
    this.handleSearchAccount();
  }

  debit(accountId: string){
    let debitModel:Debit={
      accountId:accountId,
      amount : this.operationFormGroup.value.amount,
      description : this.operationFormGroup.value.description
    };
    this.accountService.debit(debitModel).subscribe({
      next:(data)=>{
        alert("The debit has been done successfully!");
        this.operationFormGroup.reset();
        this.handleSearchAccount();
      },error:(err)=>{
        console.log(err);
      }
    });
  }
  credit(accountId:string){
    let creditModel:Credit={
      accountId:accountId,
      amount : this.operationFormGroup.value.amount,
      description : this.operationFormGroup.value.description
    };
    this.accountService.credit(creditModel).subscribe({
      next:(data)=>{
        alert("The credit has been done successfully!");
        this.operationFormGroup.reset();
        this.handleSearchAccount();
      },error:(err)=>{
        console.log(err);
    }
    });
  }

  handleAccountOperation() {
    let operationType = this.operationFormGroup.value.operationType;
    if(operationType == "debit"){
      console.log(this.accountId);
      this.debit(this.accountId);
    }else if(operationType == "credit"){
      this.credit(this.accountId);

    }else if(operationType == "transfer"){
      this.transfer();
    }
  }

  private transfer() {
    let transferModel:Transfer={
      accountIdSource:this.accountId,
      accountIdDestination:this.operationFormGroup.value.accountDestination,
      amount:this.operationFormGroup.value.amount,
      description:this.operationFormGroup.value.description
    };
    this.accountService.transfer(transferModel).subscribe({
      next:(data)=>{
        alert("The transfer has been done successfully!");
        this.operationFormGroup.reset();
        this.handleSearchAccount();
      },error:(err)=>{
      }
    });
  }
}
