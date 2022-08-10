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
   return this.http.get<any>(this.baseURL,{});
  }

  deleteBank(bankId: number): Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/${bankId}`);
  }

  getBankById(bankId: number): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${bankId}`);
  }

  updateBank(bankId: number, body: any): Observable<any>{
    return this.http.put<any>(`${this.baseURL}/${bankId}`,body);
  }

  sortBank(req: string): Observable<any>{
    return this.http.get<any>(this.baseURL+"/sorting?sortBy=" +req);
  }

}
