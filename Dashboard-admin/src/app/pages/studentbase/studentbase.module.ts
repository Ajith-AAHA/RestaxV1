import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
import { StudentbaseComponent } from './studentbase.component';
@NgModule({
  declarations: [StudentbaseComponent],
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
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbStepperModule,
    NbAlertModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
  ],
})
export class StudentbaseModule { }
