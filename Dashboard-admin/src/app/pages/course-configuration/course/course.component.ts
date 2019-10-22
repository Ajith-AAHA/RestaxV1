import { Component, OnInit, TemplateRef } from '@angular/core';
import { Apollo, Mutation } from 'apollo-angular';
import * as Query from './query';
import 'rxjs/add/operator/map';
declare var d3: any;
import { AngularD3TreeLibService } from 'angular-d3-tree';
import dataTreeSimple from './data-tree-simple';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  modalRef: BsModalRef;

  data: any[];
  selectedNode: any;

  constructor(private apollo: Apollo,
    private treeService: AngularD3TreeLibService, private modalService: BsModalService,private _http:HttpClient) {
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
  dept: any = {};
  course: any = {};
  level: any = {};

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  courses:  Array<any> = [];


  coursename: any;

  departmentname: any;
  shortcode: any;

  levelname: any;
  levelshortcode: any;
  year: any;
  terms: any;

  CardContent= ['This page is used to manipulate institute Configuration Data'];
  HeadElements= ['Action', 'ID', 'LevelName', 'LevelShortcode', 'Year', 'Terms'];
  CourseTitle= ['Set Courses'];
  DepartmentTitle= ['Set Departments'];
  LevelTitle= ['Set Levels'];
  CourseModule: boolean = true;
  setcourse: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = false;
  department: boolean = false;
  setlevels: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;

ngOnInit() {
     this.getAllcourses();
    //  this.submitted = false;
    //  this.course = new Course();
 
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


Cancel(course) {
  course.editable = !course.editable;
  this.EditRecord = true;
  this.EditActions = false;

}


getAllcourses() {

  this._http.get('http://192.168.0.105:8000/courses/').subscribe((data) => {
    console.log('django data ', data);
    // this.courses = data;
  });
  
}


/**
 * Edit department
 * @param coursename

 * @param template
 */
showEditcourse (course, template) {
  this.coursename = course.coursename;
  this.course = course;
  this.modalRef = this.modalService.show(template);
  }
  


Course() {
  this.setcourse = true;
  this.department = false;
  this.setlevels = false;
  this.Unknownstate = false;
  this.Blocktree = false;

}

Depts() {
  this.setcourse = false;
  this.department = true;
  this.setlevels = false;
  this.Unknownstate = false;
  this.Blocktree = false;

}
Levels() {
  this.setcourse = false;
  this.department = false;
  this.setlevels = true;
  this.Unknownstate = false;
  this.Blocktree = false;

}
BlockTree() {
this.Blocktree = true;
this.Unknownstate = false;
this.setcourse = false;
this.setlevels = false;
this.department = false;
this.CourseModule = false;
}
TreeBlock() {

}
// Open Modal
openModal(template: TemplateRef<any>) {
  this.departmentname = '';
  this.shortcode = '';
  this.dept = {};
  this.modalRef = this.modalService.show(template);
}

// Close Modal
closeFirstModal() {
  this.modalRef.hide();
  this.modalRef = null;
}
}
