import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CoursedataService {


  private baseUrl = 'http://192.168.0.105:8000';

  constructor(private http: HttpClient) { }

  getCourse(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(course: Object): Observable<Object> {
    console.log(course);
    return this.http.post(`${this.baseUrl}/courses`, course);
  }

  updateCourse(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCourse(course_id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${course_id}`);
  }

  getCoursesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses`);
  }

  getCustomersById(age: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/age/${age}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }

// departments

getdepartmentlist(): Observable<any> {
  return this.http.get(`${this.baseUrl}/departments`);
}
adddepartment(department: Object): Observable<Object> {
  return this.http.post(`${this.baseUrl}/departments`, department);
}
// levels
getlevellist(): Observable<any> {
  return this.http.get(`${this.baseUrl}/levels`);
}
addlevel(level: Object): Observable<Object> {
  return this.http.post(`${this.baseUrl}/levels`, level);
}
}
