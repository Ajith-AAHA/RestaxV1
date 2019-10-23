import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
  NbCalendarModule,
  NbAlertModule,
  NbDialogModule,
  NbDialogConfig,
  NbDialogRef,
  NbCalendarRangeModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularD3TreeLibModule } from 'angular-d3-tree';

import { CourseConfigurationRoutingModule} from './course-configuration-routing.module';
import { CourseConfigurationComponent } from './course-configuration.component';
// tslint:disable-next-line: max-line-length
import { DialogNamePromptComponent } from '../course-configuration/course/dialog-name-prompt/dialog-name-prompt.component';

import {CourseComponent} from './course/course.component';
import { ExamComponent } from './exam/exam.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { DayCellComponent } from './exam/day-cell/day-cell.component';

import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  declarations: [CourseConfigurationComponent,
    CourseComponent, ExamComponent, DayCellComponent, DialogNamePromptComponent],
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
    NbCalendarModule,
    NbCalendarRangeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CourseConfigurationRoutingModule,
    ModalModule.forRoot(),
    NbDialogModule.forRoot(),

    NgMultiSelectDropDownModule,
    HttpClientModule,
    HttpModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
  ],
  entryComponents: [DialogNamePromptComponent],
})
export class CourseConfigurationModule { }
