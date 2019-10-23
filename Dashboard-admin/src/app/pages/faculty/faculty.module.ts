import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbRouteTabsetModule,
} from '@nebular/theme';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbStepperModule,

} from '@nebular/theme';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ThemeModule } from '../../@theme/theme.module';
import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import {FacultiesPoolComponent} from './faculties-pool/faculties-pool.component';
import {FacultyBaseComponent} from './faculty-base/faculty-base.component';
import {FacultyRegistrationComponent} from './faculty-registration/faculty-registration.component';
import {GraphQLModule} from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


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
    NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbStepperModule,
  GraphQLModule,
HttpClientModule,
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
