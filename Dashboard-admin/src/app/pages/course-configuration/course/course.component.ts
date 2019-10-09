import { Component, OnInit, TemplateRef } from '@angular/core';
import { Apollo, Mutation } from 'apollo-angular';
import * as Query from './query';
import 'rxjs/add/operator/map';
declare var d3: any;
import { AngularD3TreeLibService } from 'angular-d3-tree';
import dataTreeSimple from './data-tree-simple';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '\@angular/animations';

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
    private treeService: AngularD3TreeLibService, private modalService: BsModalService) {
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
    this.getAlldepartments();
    this.getLevels();
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
 * Edit department
 * @param coursename

 * @param template
 */
showEditcourse (course, template) {
  this.coursename = course.coursename;
  this.course = course;
  this.modalRef = this.modalService.show(template);
  }
  /**
   * update course
   * @param course
   * @param coursename
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

          const index = data.courses.map(function (x) { return x.id; }).indexOf(this.course.id);

          data.courses[index].coursename = course;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.courses, data });
        },
      })
      .subscribe(({ data }) => {
       console.log(data);
       this.closeFirstModal();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
}

// department code block
departments: any[];

/**
 * @param departmentname
 * @param shortcode
 */
adddepartment(departmentname, shortcode, index) {
  this.apollo
  .mutate({
    mutation: Query.adddepartment,
    variables: {
      departmentname: departmentname,
      shortcode: shortcode,
    },
    // @ts-ignore
    update: (proxy, {data: {adddepartment}}) => {
                // Read the data from our cache for this query.
const data: any = proxy.readQuery({query: Query.departments});

data.departments.push(adddepartment);

          // Write our data back to the cache.
proxy.writeQuery({query: Query.departments, data});
    },
  }).subscribe(({data}) => {
    this.departmentname = '';
    this.shortcode = '';
    console.log(data);
    this.fieldArray.splice(index, 1);
  }, (error) => {
    console.log('there was an error sending query');
  });
}


removedepartment(id) {
  this.apollo
  .mutate({
    mutation: Query.removedepartment,
    variables: {
      id: id,
    },
    // @ts-ignore
    update: (proxy, {data: {removedepartment}}) => {
                // Read the data from our cache for this query.
                const data: any = proxy.readQuery({query: Query.departments});
                const index = data.departments.map(function(x){return x.id; }).indexOf(id);
                data.departments.splice(index, 1);
                          // Write our data back to the cache.
                proxy.writeQuery({query: Query.departments, data});
    },
  }).subscribe(({data}) => {
    console.log(data);
  }, (error) => {
    console.log('there was an error sending query');
  });
}

/**
 * Edit department
 * @param departmentname
 * @param shortcode
 * @param template
 */
showEditdepartment (dept, template) {
this.departmentname = dept.departmentname;
this.shortcode = dept.shortcode;
this.dept = dept;
this.modalRef = this.modalService.show(template);
}
/**
 * updatedepartment
 * @param dept
 * @param shortcode
 */
updatedepartment(dept, shortcode) {

this.apollo
.mutate({
  mutation: Query.updatedepartment,
  variables: {
    id: this.dept.id,
    departmentname: dept,
    shortcode: shortcode,
  },
  // @ts-ignore
  update: (proxy, {data: {updatedepartment}}) => {
          // Read the data from our cache for this query.
const data: any = proxy.readQuery({query: Query.departments});
const index = data.departments.map(function(x){return x.id; }).indexOf(this.dept.id);
data.departments[index].departmentname = dept;
proxy.writeQuery({query: Query.departments, data});
  },
}).subscribe(({data}) => {
  this.closeFirstModal();
}, (error) => {
  console.log('there was an error sending the query', error);
});
}
getAlldepartments() {
  this.apollo.watchQuery({query: Query.departments})
  .valueChanges
  .map((result: any) => result.data.departments).subscribe((data) => {
    this.departments = data;
    console.log(this.departments);
  });
 }

levels: Array<any> = [];

/**
 * @param levelname
 * @param levelshortcode
 * @param year
 * @param terms
 */

addlevel(levelname, levelshortcode, year, terms, index) {
  this.apollo
  .mutate({
    mutation: Query.addlevel,
    variables: {
      levelname: levelname,
      levelshortcode: levelshortcode,
      year: year,
      terms: terms,
    },
    // @ts-ignore
    update: (proxy, {data: {addlevel}}) => {
      // read the data from our cache for this query
      const data: any = proxy.readQuery({query: Query.Levels});
      data.levels.push(addlevel);
      // write our data back to the cache
      proxy.writeQuery({query: Query.Levels, data});
    },
  }).subscribe(({data}) => {
    this.levelname = '';
    this.levelshortcode = '';
    this.year = '';
    this.terms = '';
    console.log(data);
    this.fieldArray.splice(index, 1);
  }, (error) => {
    console.log('there was an error sending query');
  },
  );


  }
/**
 * Remove level
 *@param id
 */
removelevel(id) {
this.apollo
.mutate({
  mutation: Query.removelevel,
  variables: {
    id: id,
  },
  // @ts-ignore
  update: (proxy, {data: {removelevel}}) => {
              // Read the data from our cache for this query.
  const data: any = proxy.readQuery({query: Query.Levels});
  const index = data.levels.map(function(x){return x.id; }).indexOf(id);
  data.levels.splice(index, 1);
            // Write our data back to the cache.
proxy.writeQuery({query: Query.Levels, data});
  },
}).subscribe(({data}) => {
  console.log(data);
}, (error) => {
  console.log('there was an error in sending the query');
});
}
/**
 * Editlevel
 * @param level
 * @param template
 */
showEditlevel(level, template) {
this.levelname = level.levelname;
this.levelshortcode = level.levelshortcode;
this.year = level.year;
this.terms = level.terms;
this.level = level;
this.modalRef = this.modalService.show(template);
}
/**
 * updatelevel
 * @param level
 */
updatelevel(level, levelshortcode, year, terms) {
this.apollo
.mutate({
  mutation: Query.updatelevel,
  variables: {
    id: this.level.id,
    levelname: level,
    levelshortcode: levelshortcode,
    year: year,
    terms: terms,
  },
  // @ts-ignore
  update: (proxy, {data: {updatelevel}}) => {
              // Read the data from our cache for this query.
  const data: any = proxy.readQuery({query: Query.Levels});
  const index = data.levels.map(function(x){return x.id; }).indexOf(this.level.id);
  data.levels[index].name = level;
            // Write our data back to the cache.
  proxy.writeQuery({query: Query.Levels, data});
  },
}).subscribe(({data}) => {
  this.closeFirstModal();
}, (error) => {
  console.log('there was an error sending query');
});
}
// getalllevels
getLevels() {
  this.apollo.watchQuery({query: Query.Levels})
  .valueChanges
  .map((result: any) => {
    return result.data.levels;
  }).subscribe((data) => {
    this.levels = data;
  });
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
