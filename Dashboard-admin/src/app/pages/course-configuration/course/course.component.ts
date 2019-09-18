import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from './query';
import 'rxjs/add/operator/map';
declare var d3: any;
import { AngularD3TreeLibService } from 'angular-d3-tree';
import dataTreeSimple from './data-tree-simple';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  data: any[];
  selectedNode: any;

  constructor(private apollo: Apollo, private treeService: AngularD3TreeLibService) {
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
  user: any = {};

  isVisible = false;

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  courses:  Array<any> = [];
  course: any = [];

  coursename: any;

  departments:  Array<any> = [];
  departmentname: any;
  shortcode: any;

  levels:  Array<any> = [];
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
    this.getAllcourses();
  }
  addFieldValue() {
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
/**
 * @param coursename
 */
addcourse(coursename, index) {
  this.apollo
  .mutate({
  mutation: Query.addcourse,
  variables: {
        coursename: coursename,
},
// @ts-ignore
update: (proxy, {data: {addcourse}}) => {

       // Read the data from our cache for this query.

const data: any = proxy.readQuery({query: Query.courses});
data.courses.push(addcourse);
      // write our data back to cache
proxy.writeQuery({query: Query.courses, data});
},
}).subscribe(({data}) => {
  console.log('it is worked');
  this.fieldArray.splice(index, 1);
}, (error) => {
  console.log('there was an error sending query', error);
});
}
getAllcourses() {
  this.apollo.watchQuery({query: Query.courses})
  .valueChanges
  .map((result: any) => result.data.courses).subscribe((data) => {
    this.courses = data;
  });
}

/**
 * Remove course
 * @param id
 */
// tslint:disable-next-line: no-shadowed-variable
removecourse(id: any) {
  this.apollo
  .mutate({
   mutation: Query.removecourse,
   variables: {
   id: id,
},
// @ts-ignore
update: (proxy, {data: {removecourse}}) => {
            // Read the data from our cache for this query.
const data: any = proxy.readQuery({query: Query.courses});
const index = data.courses.map(function(x){return x.id; }).indexOf(id);

data.courses.splice(index, 1);
          // Write our data back to the cache.
proxy.writeQuery({query: Query.courses, data});
},

}).subscribe(({data}) => {
  console.log(data);
}, (error) => {
  console.log('there was an error sending the query', error);
});
}

/**
   * Update User
   * @param course
   */
  // tslint:disable-next-line: no-shadowed-variable
  updatecourse(course) {
    this.apollo
      .mutate({
        mutation: Query.updatecourse,
        variables: {
          id: this.course.id,
          coursename: course,
        },
        // @ts-ignore
        update: (proxy, { data: { updatecourse } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.courses });

          const index = data.users.map(function (x) { return x.id; }).indexOf(this.course.id);

          data.users[index].coursename = course;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.courses, data });
        },
      })
      .subscribe(({ data }) => {
       console.log(data);
       course.editable = !course.editable;
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }
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
BlockTree() {
this.Blocktree = true;
this.Unknownstate = false;
this.setcourse = false;
this.level = false;
this.department = false;
this.CourseModule = false;
}
}
