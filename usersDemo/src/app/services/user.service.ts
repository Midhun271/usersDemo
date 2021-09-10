import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL = 'https://jsonplaceholder.typicode.com/users';
  httpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient) {

   }

  getUsersList(){    
    return this.http.get<any>(`${this.serverURL}`);
  }

  deleteUser(id : number){
    return this.http.delete(`${this.serverURL}/${id}`);
  }

  addUser(params){
    return this.http.post(`${this.serverURL}`, JSON.stringify(params), {headers: this.httpHeaders})
  }

  updateUser(params){
    return this.http.put(`${this.serverURL}/${params.id}`, JSON.stringify(params), {headers: this.httpHeaders})
  }

}
