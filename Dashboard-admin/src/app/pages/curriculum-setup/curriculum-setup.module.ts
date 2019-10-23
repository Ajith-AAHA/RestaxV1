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
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CurriculumSetupComponent} from './curriculum-setup.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { FsIconComponent } from './curriculum/curriculum.component';
import { CurriculumSetupRoutingModule } from './curriculum-setup-routing.module';
import {AngularTreeGridModule} from 'angular-tree-grid';
import { TreeviewModule } from 'ngx-treeview';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GridModule, EditService, ToolbarService, SortService } from '@syncfusion/ej2-angular-grids';

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
    MatIconModule,
    MatTreeModule,
    GridModule,

    AngularTreeGridModule,
    NbDialogModule.forRoot(),
    TreeviewModule.forRoot(),
    ModalModule.forRoot(),
    CurriculumSetupRoutingModule,
  ],
  exports: [FsIconComponent],
  providers: [EditService, ToolbarService, SortService],

})
export class CurriculumSetupModule { }
