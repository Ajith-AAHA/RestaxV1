import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultybaseComponent } from './facultybase.component';
import { PweprofileComponent } from './pweprofile/pweprofile.component';
import { PwtprofileComponent } from './pwtprofile/pwtprofile.component';
import { PwiprofileComponent } from './pwiprofile/pwiprofile.component';

const routes: Routes = [{
  path: '',
  component: FacultybaseComponent,
  children: [
    {
      path: 'pweprofile',
      component:PweprofileComponent ,
    },
    {
      path: 'pwtprofile',
      component: PwtprofileComponent,
    },
    {
      path: 'pwiprofile',
      component: PwiprofileComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultybaseRoutingModule { }
