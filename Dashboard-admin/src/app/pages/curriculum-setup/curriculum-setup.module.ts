import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
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
  NbDialogModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CurriculumSetupComponent} from './curriculum-setup.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { FsIconComponent } from './curriculum/curriculum.component';
import { CurriculumSetupRoutingModule } from './curriculum-setup-routing.module';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [CurriculumSetupComponent, CurriculumComponent, FsIconComponent],
  imports: [
  ThemeModule,
    // BrowserAnimationsModule,
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
    NbTreeGridModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NbDialogModule.forRoot(),
    ModalModule.forRoot(),
    CurriculumSetupRoutingModule,
  ],
  exports: [FsIconComponent],


})
export class CurriculumSetupModule { }
