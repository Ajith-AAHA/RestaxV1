import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import 'rxjs/add/operator/map';
declare var d3: any;
import { AngularD3TreeLibService } from 'angular-d3-tree';
import dataTreeSimple from './data-tree-simple';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Course } from '../../Models/course';
import { CoursedataService } from './../../Services/coursedata.service';
export class Course {
  course_id: number;
  course_name: string;
}
export class Department {
  department_id: number;
  name: string;
  shortcode: string;
}
@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  course: Course = new Course();
  department: Department = new Department();

  course_id: any;
  course_name: any;
  submitted = false;

  modalRef: BsModalRef;
  names: string[] = [];
  data: any[];
  selectedNode: any;
  basic: string;
  FormBuilder: any;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private _http: HttpClient, private CoursedataService: CoursedataService,
    private treeService: AngularD3TreeLibService, private modalService: BsModalService,
    private dialogService: NbDialogService) {
    this.data = dataTreeSimple.result;
   }
  nodeUpdated(node: any) {
    console.info('app detected node change');
  }
  nodeSelected(node: any) {
    console.info('app detected node selected', node);
    this.selectedNode = node;
  }

  addNode(): void {
    const parent = this.selectedNode ? this.selectedNode.id : '1';
    const name = window.prompt('new node name');
    this.treeService.addNode({id: '999', descripcion: name, parent: parent});
  }
  // dept: any = {};
  // course: any = {};
  // level: any = {};

  private coursefieldArray: Array<any> = [];
  private departmentfieldArray: Array<any> = [];
  private levelfieldArray: Array<any> = [];

  private newAttribute: any = {};

  courses:  Array<any> = [];

departments: Array<any> = [];
levels: Array<any> = [];
  coursename: any;

  name: any;
  shortcode: any;
  levelname: any;
  levelshortcode: any;
  year: any;
  terms: any;

  CardContent= ['This page is used to manipulate institute Configuration Data'];
  HeadElements= ['Action', 'LevelName', 'LevelShortcode', 'Year', 'Terms'];
  CourseTitle= ['Set Courses'];
  DepartmentTitle= ['Set Departments'];
  LevelTitle= ['Set Levels'];
  CourseModule: boolean = true;
  setcourse: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = false;
  setdepartment: boolean = false;
  setlevels: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;



  ngOnInit() {

    this.getAllcourses();
    this.getAlldepartments();
    this.getAlllevels();
    this.submitted = false;
    this.course = new Course();

  }


  courseadd() {
    this.CoursedataService.createCourse(this.course)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
        },
        error => console.log(error));
    this.course = new Course();
  }
  removecourse() {
    this.CoursedataService.deleteCourse(this.course.course_id)
    .subscribe(
      data => {
      console.log(data);
      this.courses = data;
    } ,
    error => console.log(error));
  }

  onSubmit(index) {
    this.courseadd();
    this.coursefieldArray.splice(index, 1);

  }
  addCourseValue() {
    this.course_name = '';
    this.coursefieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  addDeptValue() {
    this.name = '';
    this.shortcode = '';
    this.departmentfieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  addLevelValue() {
    this.levelname = '';
    this.levelshortcode = '';
    this.year = '';
    this.terms = '';
    this.levelfieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  deleteCourseValue(index: number) {
  this.coursefieldArray.splice(index, 1);
}
deleteDeptValue(index: number) {
  this.departmentfieldArray.splice(index, 1);
}
 deleteLevelValue(index: number) {
  this.levelfieldArray.splice(index, 1);
}
editCourse(course: any) {
  course.editable = !course.editable;
  this.EditRecord = false;
  this.EditActions = true;
}


Cancel(course: { editable: boolean; }) {
  course.editable = !course.editable;
  this.EditRecord = true;
  this.EditActions = false;

}



getAllcourses() {

  this.CoursedataService.getCoursesList().subscribe((data: any) => {
    this.courses = data;
    console.log('django data ', data);
    console.log(this.courses);
  });
}
// getAlldepartments() {

//   this._http.get('http://192.168.0.105:8000/departments/').subscribe((data) => {
//     console.log('django data ', data);
//     // this.courses = data;
//   });
  
// }
// getAlllevels() {

//   this._http.get('http://192.168.0.105:8000/levels/').subscribe((data) => {
//     console.log('django data ', data);
//     // this.courses = data;
//   });
  
// }

getAlldepartments() {
this.CoursedataService.getdepartmentlist().subscribe((data: any) => {
  this.departments = data;
});
}

getAlllevels() {
  this.CoursedataService.getlevellist().subscribe((data: any) => {
    this.levels = data;
  });
}




Course() {
  this.setcourse = true;
  this.setdepartment = false;
  this.setlevels = false;
  this.Unknownstate = false;
  this.Blocktree = false;

}

Depts() {
  this.setcourse = false;
  this.setdepartment = true;
  this.setlevels = false;
  this.Unknownstate = false;
  this.Blocktree = false;

}
Levels() {
  this.setcourse = false;
  this.setdepartment = false;
  this.setlevels = true;
  this.Unknownstate = false;
  this.Blocktree = false;

}
BlockTree() {
this.Blocktree = true;
this.Unknownstate = false;
this.setcourse = false;
this.setlevels = false;
this.setdepartment = false;
this.CourseModule = false;
}
TreeBlock() {

}
// Open Modal
openModal(template: TemplateRef<any>) {
  this.name = '';
  this.shortcode = '';
  // this.dept = {};
  this.modalRef = this.modalService.show(template);
}

// Close Modal
closeFirstModal() {
  this.modalRef.hide();
  this.modalRef = null;
}
}
