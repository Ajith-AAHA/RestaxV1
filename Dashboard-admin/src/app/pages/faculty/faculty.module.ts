import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbRouteTabsetModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ThemeModule } from '../../@theme/theme.module';
import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import {FacultiesPoolComponent} from './faculties-pool/faculties-pool.component';
import {FacultyBaseComponent} from './faculty-base/faculty-base.component';
import {FacultyRegistrationComponent} from './faculty-registration/faculty-registration.component';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    ModalModule,
    NbRouteTabsetModule,
    FacultyRoutingModule,
    ThemeModule,
    NbIconModule,
    NbCardModule,
  ],
  declarations: [
    FacultyComponent,
    FacultiesPoolComponent,
    FacultyBaseComponent,
    FacultyRegistrationComponent,

  ],
  providers: [
  ],
})
export class FacultyModule { }
