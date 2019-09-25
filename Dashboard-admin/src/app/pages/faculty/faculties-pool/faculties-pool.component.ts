import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-faculties-pool',
  templateUrl: './faculties-pool.component.html',
  styleUrls: ['./faculties-pool.component.scss'],
})
export class FacultiesPoolComponent implements OnInit {
  dept: any = {};

  isVisible = false;

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  courses:  Array<any> = [];

  course: any = [];

  coursename: any;

  departmentname: any;
  shortcode: any;

  levelname: any;
  levelshortcode: any;
  year: any;
  terms: any;

  CardContent= ['This page is used to manipulate institute Configuration Data'];

  CourseTitle= ['Set Courses'];
  DepartmentTitle= ['Set Departments'];
  LevelTitle= ['Set Levels'];
  CourseModule: boolean = true;
  setcourse: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = false;
  department: boolean = false;
  level: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;




  ngOnInit() {

  }
  addFieldValue() {
    this.coursename = '';
    this.levelname = '';
    this.levelshortcode = '';
    this.year = '';
    this.terms = '';
    this.departmentname = '';
    this.shortcode = '';
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  deleteFieldValue(index) {
  this.fieldArray.splice(index, 1);
}

editCourse(course: any) {
  course.editable = !course.editable;
  this.EditRecord = false;
  this.EditActions = true;
}
// testcourse() {
//   alert('it worked');
// }

Cancel(course) {
  course.editable = !course.editable;
  this.EditRecord = true;
  this.EditActions = false;

}

}
