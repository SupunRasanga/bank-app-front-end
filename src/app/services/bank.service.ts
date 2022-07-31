import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseURL = "http://localhost:8086/api/home/bank";

  constructor(private http: HttpClient) { }

  createBank(bank : any): Observable<Object>{
    return this.http.post(`${this.baseURL}`,bank);
  }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseURL}`).pipe(map((res) => {
      const banks:any[] = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          banks.push({...res[key], id: key});
        }
      }
      return banks;
    }));
  }

  // getAll(): Observable<any>{
  //   //return this.http.get(`${this.baseAPIUrl}/customer.json`).pipe(map((res) => {
  //   return this.http.get(`${this.baseURL}/customer.json`).pipe(map((res) => {
  //     const customers:any[] = [];
  //     for(const key in res){
  //       if(res.hasOwnProperty(key)){
  //         customers.push({...res[key], id: key});
  //       }
  //     }
  //     return customers;
  //   }));
  // }



}
