import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Query from './query';
import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ngx-studentbase',
  templateUrl: './studentbase.component.html',
  styleUrls: ['./studentbase.component.scss']
})
export class StudentbaseComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  faculties: Array<any> = []; // List of Faculties
  faculty: any = {};
  iname: any;
  fname: any;
      sname: any;
      pmanaging: any;
      email: any;
      phone: any;
      pwt: any;
      pwi: any;
      pwe: any;
      password: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getFaculties();
    this.dropdownList = [
      { item_id: 1, item_text: 'ME101-Basics of Mechanical Engineering' },
      { item_id: 2, item_text: 'ME102-Basics of Mechanical Engineering' },
      { item_id: 3, item_text: 'ME103-Basics of Mechanical Engineering' },
      { item_id: 4, item_text: 'ME104-Basics of Mechanical Engineering' },
      { item_id: 5, item_text: 'ME105-Basics of Mechanical Engineering' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'ME104-Basics of Mechanical Engineering' },
      { item_id: 4, item_text: 'ME105-Basics of Mechanical Engineering' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

/**
   * Create Faculty
   * @param  iname
   *@param fname
    *@param sname
    *@param  pmanaging
     *@param email
     *@param phone
    *@param  pwt
   *@param   pwi
    *@param  pwe
   *@param   password    Name of Faculty
   */
  addfaculty(iname, fname, sname, pmanaging, email, phone, pwt, pwi, pwe, password) {

    this.apollo
      .mutate({
        mutation: Query.addfaculty,
        variables: {
          iname: iname ,
          fname: fname,
          sname: sname,
          pmanaging: pmanaging,
          email: email,
          phone: phone,
          pwt: pwt,
          pwi: pwi,
          pwe: pwe,
          password: password,
        },
        // @ts-ignore
        update: (proxy, { data: { addfaculty } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Faculties });

          data.faculties.push(addfaculty);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Faculties, data });
        },
      })
      .subscribe(({ data }) => {
        // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Remove Faculty
   * @param id
   */
  // tslint:disable-next-line: no-shadowed-variable
  removefaculty(id: any) {
    this.apollo
      .mutate({
        mutation: Query.removefaculty,
        variables: {
          id: id,
        },
        // @ts-ignore
        update: (proxy, { data: { removefaculty } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Faculties});

          const index = data.faculties.map(function (x) { return x.id; }).indexOf(id);

          data.faculties.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Faculties, data });
        },
      })
      .subscribe(({ data }) => {
        console.log(data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Edit Faculty Form
   * @param faculty
   *
   */
  showEditFacultyForm(faculty ) {
    this.iname = faculty.iname;
    this.faculty = faculty;
   }

  /**
   * Update Faculty
   * @param faculty
   * @param iname
   */
   // tslint:disable-next-line: no-shadowed-variable
  updateFaculty(faculty) {
    this.apollo
      .mutate({
        mutation: Query.updatefaculty,
        variables: {
          id: this.faculty.id,
          iname: faculty,
        },
         // @ts-ignore
        update: (proxy, { data: { updatefaculty } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Faculties });

          const index = data.faculties.map(function (x) { return x.id; }).indexOf(this.faculty.id);

          data.faculties[index].iname = faculty;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Faculties, data });
        },
      })
      .subscribe(({ data }) => {

      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * ----------------------------------------------------
   * Get All Faculties
   * ----------------------------------------------------
   * @method getFaculties
   */
  getFaculties() {
    this.apollo.watchQuery({ query: Query.Faculties })
      .valueChanges
      .map((result: any) => result.data.faculties).subscribe((data) => {
        this.faculties = data;
      });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}



