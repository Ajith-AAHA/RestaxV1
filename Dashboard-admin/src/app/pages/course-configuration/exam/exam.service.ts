import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  
    private baseUrl = 'http://192.168.0.105:8000/exams';
  
    constructor(private http: HttpClient) { }
  
    getexams(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
    createExams(course: Object): Observable<Object> {
      console.log(course);
      return this.http.post(`${this.baseUrl}/`, course);
    }
  
    updateExams(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }
  
    deleteExams(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
  
    getCustomersList(): Observable<any> {
      return this.http.get(`${this.baseUrl}/`);
    }
  
    getCustomersById(age: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/age/${age}/`);
    }
  
    deleteAll(): Observable<any> {
      return this.http.delete(`${this.baseUrl}/`);
    }
  
  }

