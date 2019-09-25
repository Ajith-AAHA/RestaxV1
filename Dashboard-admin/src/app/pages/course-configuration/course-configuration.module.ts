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

} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularD3TreeLibModule } from 'angular-d3-tree';

import { CourseConfigurationRoutingModule} from './course-configuration-routing.module';
import { CourseConfigurationComponent } from './course-configuration.component';

import {CourseComponent} from './course/course.component';
import { ExamComponent } from './exam/exam.component';

@NgModule({
  declarations: [ CourseConfigurationComponent,CourseComponent,ExamComponent],
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
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CourseConfigurationRoutingModule,
    ModalModule.forRoot(),

  ],
})
export class CourseConfigurationModule { }
