import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ModalModule } from 'ngx-bootstrap/modal';
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
  NbAlertModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularD3TreeLibModule } from 'angular-d3-tree';

import { CourseConfigurationRoutingModule } from './course-configuration-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseConfigurationComponent } from './course-configuration.component';
@NgModule({
  declarations: [CourseConfigurationComponent, CourseComponent],
  imports: [
  AngularD3TreeLibModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbStepperModule,
    NbAlertModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CourseConfigurationRoutingModule,
    ModalModule.forRoot(),

  ],
})
export class CourseConfigurationModule { }
