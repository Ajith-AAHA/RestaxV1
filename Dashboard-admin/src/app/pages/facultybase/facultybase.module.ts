import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

import { FacultybaseRoutingModule } from './facultybase-routing.module';
import { FacultybaseComponent } from './facultybase.component';
import { PweprofileComponent } from './pweprofile/pweprofile.component';
import { PwtprofileComponent } from './pwtprofile/pwtprofile.component';
import { PwiprofileComponent } from './pwiprofile/pwiprofile.component';

@NgModule({
  declarations: [
    FacultybaseComponent,
    PweprofileComponent,
    PwtprofileComponent,
    PwiprofileComponent
  ],
  imports: [
    CommonModule,
    FacultybaseRoutingModule,
    NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  ]
})
export class FacultybaseModule { }
