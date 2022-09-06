import {Customer} from "./customer.model";

export interface BankAccount {
  id:            string;
  balance:       number;
  createdAt:     Date;
  status:        string;
  customer:   Customer;
  type:          string;
  overDraft?:    number;
  interestRate?: number;
}
