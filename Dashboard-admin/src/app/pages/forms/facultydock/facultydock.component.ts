import { Component, OnInit, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import * as Query from './query';
import 'rxjs/add/operator/map';


@Component({
  selector: 'ngx-facultydock',
  templateUrl: './facultydock.component.html',
  styleUrls: ['./facultydock.component.scss'],
})
export class FacultydockComponent implements OnInit {
  modalRef: BsModalRef;

  // facultyForm: FormGroup;
  // loading = false;
  // submitted = false;
  // id= '';
  // facultyname= '';
  // facultyemail= '';
  // pwt= '';
  // pwi= '';
  // pwc= '';

  tableHead = ['Department of Mechanical Engineering'];

  CardContent= ['This page is used to manipulate current Department/Grade database'];

  FacultyTitle= ['Faculties dock'];

  headElements = ['Actions', 'ID', 'Name', 'email', 'PWT', 'PWI', 'PWC'];

  faculties:  Array<any> = [];

  faculty: any = {};
  facultyname: any;
  facultyemail: any;
  pwt: any;
  pwi: any;
  pwc: any;

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllusers();
    // this.createfaculty();
  }
/**
 * create faculty
 * @param facultyname
 * @param facultyemail
 * @param pwt
 * @param pwi
 * @param pwc
 */
createfaculty(facultyname, facultyemail, pwt, pwi, pwc) {
  this.apollo
  .mutate({
    mutation: Query.addfaculty,
    variables: {
      facultyname: facultyname,
      facultyemail: facultyemail,
      pwt: pwt,
      pwi: pwi,
      pwc: pwc,
    },
    // @ts-ignore
    update: ( proxy, {data:  { addfaculty } }) => {

     // Read the data from our cache for this query.
      const data: any = proxy.readQuery({query: Query.faculties});
      data.faculties.push(addfaculty);
      // write our data back to cache
      proxy.writeQuery({query: Query.faculties, data});

    },
  }).subscribe(({data}) => {
    console.log('it is worked');
  }, (error) => {
    console.log('there was an error sending the query', error);
  });

}
getAllusers() {
  this.apollo.watchQuery({query: Query.faculties})
  .valueChanges
  .map((result: any) => result.data.faculties).subscribe((data) => {
    this.faculties = data;
  });
}
/**
 * Remove faculty
 * @param id
 */
removefaculty(id) {
  this.apollo
  .mutate({
   mutation: Query.removefaculty,
   variables: {
   id: id,
},
// @ts-ignore
update: (proxy, {data: {removefaculty}}) => {
            // Read the data from our cache for this query.
const data: any = proxy.readQuery({query: Query.faculties});
const index = data.faculties.map(function(x){return x.id; }).indexOf(id);

data.faculties.splice(index, 1);
          // Write our data back to the cache.
proxy.writeQuery({query: Query.faculties, data});
},

}).subscribe(({data}) => {
  console.log(data);
}, (error) => {
  console.log('there was an error sending the query', error);
});
}
/**
 * Edit faculty
 * @param faculty
 * @param template
 */
showEditfacultyForm(faculty, template) {
  this.facultyname = faculty.facultyname,
  this.facultyemail = faculty.facultyemail,
  this.pwt = faculty.pwt;
  this.pwi = faculty.pwi;
  this.pwc = faculty.pwc;
  this.faculty = faculty;
  this.modalRef = this.modalService.show(template);
}
/**
 * update faculty
 * @param faculty
 */
updatefaculty(faculty) {
  this.apollo
  .mutate({
    mutation: Query.updatefaculty,
    variables: {
      id: this.faculty.id,
      facultyname: faculty,
      facultyemail: faculty,
      pwt: faculty,
      pwi: faculty,
      pwc: faculty,
    },
// @ts-ignore
update: (proxy, {data: {updatefaculty}}) => {

// Read the data from our cache for this query.

const data: any = proxy.readQuery({query: Query.faculties});

const index = data.faculties.map(function(x){return x.id; }).indexOf(this.faculty.id);

data.faculties[index].facultyname = this.facultyname;
data.faculties[index].facultyemail = this.facultyemail;
data.faculties[index].pwt = this.pwt;
data.faculties[index].pwi = this.pwi;
data.faculties[index].pwc = this.pwc;

          // Write our data back to the cache.
proxy.writeQuery({query: Query.faculties, data});
    },
  }).subscribe(({data}) => {
    this.closeFirstModal();
  }, (error) => {
    console.log('there was an error sending the query', error);
  });
}
// Open Modal
openModal(template: TemplateRef<any>) {
  this.facultyname = '';
  this.facultyemail = '';
  this.pwt = '';
  this.pwi = '';
  this.pwc = '';
  this.faculty = {};
  this.modalRef = this.modalService.show(template);
}

// Close Modal
closeFirstModal() {
  this.modalRef.hide();
  this.modalRef = null;
}
addrow() {

}
}
