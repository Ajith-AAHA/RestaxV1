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
  providedIn: 'root'
})
export class LevelService {

  private baseUrl = 'http://192.168.0.105:8000/';
  
    constructor(private http: HttpClient) { }
  
    getCourse(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
    getdepartment(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  getlevellist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/levels`);
  }
  addlevel(level: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/levels`, level);
  }
}
