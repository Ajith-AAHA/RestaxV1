import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  CardContent= ['This page is used to manage the Exam operations'];

  CourseTitle= ['Pre Exam Ops'];
  DepartmentTitle= ['Exam Day Ops'];
  LevelTitle= ['Post Exam Ops'];
  CourseModule: boolean = true;
  setcourse: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = false;
  department: boolean = false;
  level: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;
  Course() {
    this.setcourse = true;
    this.department = false;
    this.level = false;
    this.Unknownstate = false;
    this.Blocktree = false;
  
  }
  
  Depts() {
    this.setcourse = false;
    this.department = true;
    this.level = false;
    this.Unknownstate = false;
    this.Blocktree = false;
  
  }
  Levels() {
    this.setcourse = false;
    this.department = false;
    this.level = true;
    this.Unknownstate = false;
    this.Blocktree = false;
  
  }

}
