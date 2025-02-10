// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class DbserviceService {
//   baseURL:string="http://localhost:8888";
//   constructor(public httpObj:HttpClient) { }
  
//   getRecord(tableName:any){
//     return this.httpObj.get(`${this.baseURL}/${tableName}`)
//   }
//   deleteRecord(tableName:any,id:any){
//     return this.httpObj.delete(`${this.baseURL}/${tableName}/${id}`)
//   }
//   addRecord(tableName:any,body:any){
//     return this.httpObj.post(`${this.baseURL}/${tableName}`,body);
//   }
//   getSingleRecord(tableName:any,id:any){
//     return this.httpObj.get(`${this.baseURL}/${tableName}/${id}`)
//   }
//   updateRecord(tableName:any,id:any,body:any){
//     return this.httpObj.put(`${this.baseURL}/${tableName}/${id}`,body)
//   }
//   getUserBookings(userId:number,tableName:any){
//     return this.httpObj.get(`${this.baseURL}/${tableName}/${userId}`)
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  baseURL: string = "http://localhost:8888/api";
  
  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    // TEMPORARY WORKAROUND: Using addRecord and /user/users/signup/ endpoint
    return this.addRecord("user/users/signup", userData); // <--- Changed to use addRecord and correct signup URL
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseURL}/user/login/`, credentials);
  }

  // Generic addRecord method (if you don't already have it in your service)
  addRecord(tableName: any, body: any): Observable<any> {
    return this.http.post(`${this.baseURL}/${tableName}/`, body); // Modified to add '/' at the end of tableName
  }

  getRecord(tableName: any) {  // Keep other methods if you need them
    return this.http.get(`${this.baseURL}/${tableName}`)
  }
  deleteRecord(tableName: any, id: any) {
    return this.http.delete(`${this.baseURL}/${tableName}/${id}`)
  }

  getSingleRecord(tableName: any, id: any) {
    return this.http.get(`${this.baseURL}/${tableName}/${id}`)
  }
  updateRecord(tableName: any, id: any, body: any) {
    return this.http.put(`${this.baseURL}/${tableName}/${id}`, body)
  }
  getUserBookings(userId: number, tableName: any) {
    return this.http.get(`${this.baseURL}/${tableName}/${userId}`)
  }
}