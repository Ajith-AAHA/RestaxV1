import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DepartmentDataComponent } from './department-data/department-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultydockComponent } from './facultydock/facultydock.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'inputs',
        component: FormInputsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
      },
      {
        path: 'Gradedata',
        component: DepartmentDataComponent,
      },
      {
        path: 'facultydock',
        component: FacultydockComponent,
      },

    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

