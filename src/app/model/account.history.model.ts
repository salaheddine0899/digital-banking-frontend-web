import {Operation} from "./operation.model";

export interface AccountHistory{
  id:string;
  balance:number;
  currentPage:number;
  totalPages:number;
  operations:Array<Operation>;
  pageSize:number;
}
