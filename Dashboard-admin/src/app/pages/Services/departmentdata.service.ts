import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DepartmentdataService {
  private baseUrl = 'http://192.168.0.105:8000';

  constructor(private http: HttpClient) { }

  getCourse(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDepartment(department: Object): Observable<Object> {
    console.log(department);
    return this.http.post(`${this.baseUrl}/departments`, department);
  }

  updateDepartment(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDepartment(department_id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${department_id}`);
  }

  getDepartmentsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/department`);
  }

  getCustomersById(age: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/age/${age}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }

// // departments

// getdepartmentlist(): Observable<any> {
//   return this.http.get(`${this.baseUrl}/departments`);
// }
// adddepartment(department: Object): Observable<Object> {
//   return this.http.post(`${this.baseUrl}/departments`, department);
// }
// getlevellist(): Observable<any> {
//   return this.http.get(`${this.baseUrl}/levels`);
// }
// addlevel(level: Object): Observable<Object> {
//   return this.http.post(`${this.baseUrl}/levels`, level);
// }
}

