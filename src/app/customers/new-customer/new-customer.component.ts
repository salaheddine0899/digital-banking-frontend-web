import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
              private customerService:CustomerService,
              private  router : Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control("",[Validators.required,Validators.minLength(5)]),
      email : this.fb.control("",[Validators.required,Validators.email])
    });
  }

  onAddCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe({
      next:(data)=>{
        alert("customer has been added successfully");
        this.router.navigateByUrl("/customers");
      }
    })
  }
}
