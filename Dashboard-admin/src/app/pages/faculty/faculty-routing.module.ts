import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FacultyComponent } from './faculty.component';
import {FacultiesPoolComponent} from './faculties-pool/faculties-pool.component';
import {FacultyBaseComponent} from './faculty-base/faculty-base.component';
import {FacultyRegistrationComponent} from './faculty-registration/faculty-registration.component';

const routes: Routes = [{
  path: '',
  component: FacultyComponent,
  children: [
    {
      path: 'faculties-pool',
      component: FacultiesPoolComponent,
    },
    {
      path: 'faculty-base',
      component: FacultyBaseComponent,
    },
    {
      path: 'faculty-registration',
      component: FacultyRegistrationComponent,
    },

      ],
    }] ;


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultyRoutingModule { }

