import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pweprofile',
  templateUrl: './pweprofile.component.html',
  styleUrls: ['./pweprofile.component.scss']
})
export class PweprofileComponent {
  PWCdashboard: boolean = true;
  AnswerBlock: boolean = false;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  constructor() { }

  // tslint:disable-next-line: one-line
  evaluate(){
    this.PWCdashboard = false;
    this.AnswerBlock = true;
  }

  // tslint:disable-next-line: one-line
  newChange(){
    this.PWCdashboard = true;
    this.AnswerBlock = false;
  }

}
