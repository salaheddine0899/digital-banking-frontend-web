import {BankAccount} from "./bank-account.model";
import {Customer} from "./customer.model";

export interface CustomerAccounts {
  customer:    Customer;
  accounts:    BankAccount[];
  currentPage: number;
  totalPages:  number;
  size:        number;
}
