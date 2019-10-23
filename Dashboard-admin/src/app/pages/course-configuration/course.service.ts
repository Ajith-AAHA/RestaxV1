import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private baseUrl = 'http://192.168.0.105:8000/courses';

  constructor(private http: HttpClient) { }

  getCourse(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(course: Object): Observable<Object> {
    console.log(course);
    return this.http.post(`${this.baseUrl}/`, course);
  }

  updateCourse(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCoursesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getCoursesById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }
}
