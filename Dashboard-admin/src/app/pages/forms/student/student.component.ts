import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as Query from './query';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent  {
  modalRef: BsModalRef;
  users: Array<any> = []; // List of Users
  user: any = {};
  name: any;
  fathername: any;
  gender: any;
  department: any;
  address: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  // departments: Department[] = [
  //   { id: 1, name: 'Help Desk' },
  //   { id: 2, name: 'HR' },
  //   { id: 3, name: 'IT' },
  //   { id: 4, name: 'Payroll' }
  // ];

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  // export class Department {
  //     id: number;
  //     name: string;
  //  }


  OnInit() {
    this.getUsers();

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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  /**
   * Create User
   * @param name
   * @param fathername
   * @param gender
   * @param department
   * @param address
   *
   *     Name of User
   */
  createUser(name: any, fathername: any, gender: any, department: any, address: any) {
    this.apollo
      .mutate({
        mutation: Query.addUser,
        variables: {
          name: name,
          fathername: fathername,
          gender: gender,
          department: department,
          address: address,
        },
        update: (proxy, { data: addUser }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          data.users.push(addUser);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        },
      })
      .subscribe(({ data }) => {
        this.closeFirstModal(); // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Remove User
   * @param id
   */
  removeUser(id: any) {
    this.apollo
      .mutate({
        mutation: Query.removeUser,
        variables: {
          id: id,
        },
        update: (proxy, { data:  removeUser }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          const index = data.users.map(function (x: { id: any; }) { return x.id; }).indexOf(id);

          data.users.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        },
      })
      .subscribe(({ data }) => {
        console.log(data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Edit User Form
   * @param user
   * @param template
   */
  showEditUserForm(user: { name: any; fathername: any; gender: any; department: any; address: any; }, template: any) {
    this.name = user.name;
    this.fathername = user.fathername;
    this.gender = user.gender;
    this.department = user.department;
    this.address = user.address;
    this.user = user;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Update User
  @param name
   * @param fathername
   * @param gender
   * @param department
   * @param address
   * */
  updateUser(name: any, fathername: any, gender: any, department: any, address: any) {
    this.apollo
      .mutate({
        mutation: Query.updateUser,
        variables: {
          id: this.user.id,
          name: name,
          fathername: fathername,
          gender: gender,
          department: department,
          address: address,
                  },
        update: (proxy, { data:  updateUser  }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          const index = data.users.map(function (x: { id: any; }) { return x.id; }).indexOf(this.user.id);

          data.users[index].name = name;
          data.users[index].fathername = fathername;
          data.users[index].gender = gender;
          data.users[index].department = department;
          data.users[index].address = address;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        },
      })
      .subscribe(({ data }) => {
        this.closeFirstModal();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * ----------------------------------------------------
   * Get All Users
   * ----------------------------------------------------
   * @method getUsers
   */
  getUsers() {
    this.apollo.watchQuery({ query: Query.Users })
      .valueChanges
      .map((result: any) => result.data.users).subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
    this.name = '';
    this.fathername = '';
    this.gender = '';
    this.department = '';
    this.address = '';
    this.user = {};
    this.modalRef = this.modalService.show(template);
  }

  // Close Modal
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

}


