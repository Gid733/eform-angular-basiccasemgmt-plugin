import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {OperationDataResult, OperationResult} from 'src/app/common/models/operation.models';
import {BaseService} from 'src/app/common/services/base.service';

export let CustomerPnMethods = {
  CustomerPn: 'api/case-management-pn',
};

@Injectable()
export class CaseManagementPnService extends BaseService{
  constructor(private _http: HttpClient, router: Router, toastrService: ToastrService) {
    super(_http, router, toastrService);
  }

  // getAllCustomers(model: CustomersPnRequestModel): Observable<OperationDataResult<CustomersPnModel>> {
  //   return this.post(CustomerPnMethods.CustomerPn + '/get-all', model);
  // }

  // getSingleCustomer(customerId: number): Observable<OperationDataResult<CustomerPnFullModel>> {
  //   return this.get(CustomerPnMethods.CustomerPn + '/' + customerId);
  // }

  // updateCustomer(model: CustomerPnFullModel): Observable<OperationResult> {
  //   return this.put(CustomerPnMethods.CustomerPn, model);
  // }

  // createCustomer(model: CustomerPnFullModel): Observable<OperationResult> {
  //   return this.post(CustomerPnMethods.CustomerPn, model);
  // }

  // deleteCustomer(customerId: number): Observable<OperationResult> {
  //   return this.delete(CustomerPnMethods.CustomerPn + '/' + customerId);
  // }
}
