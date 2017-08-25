import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HttpService {

  constructor(private _http:Http) { }

  createCharge(token, amount){
  	return this._http.post('/api/charge', {token: token, amount: amount})
  	.map(res=>res.json())
  	.toPromise();
  }

}
