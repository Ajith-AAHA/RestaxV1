import { NgModule } from '@angular/core';
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
import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DepartmentDataComponent } from './department-data/department-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FacultydockComponent } from './facultydock/facultydock.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {GraphQLModule} from './graphql.module';
import * as forms from '@angular/forms';
@NgModule({
  imports: [

    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    NbStepperModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    GraphQLModule,
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
    forms.FormsModule,


  ],
  declarations: [
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
    DepartmentDataComponent,
    FacultydockComponent,

  ],
})
export class FormsModule { }
