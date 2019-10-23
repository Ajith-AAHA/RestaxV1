import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ExambaseRoutingModule } from './exambase-routing.module';
import { DayopsComponent } from './dayops/dayops.component';
import { PostopsComponent } from './postops/postops.component';
import { PreopsComponent } from './preops/preops.component';
import {ExambaseComponent} from './exambase.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,NbIconModule ,
  NbTabsetModule, NbUserModule,
  
} from '@nebular/theme';
import * as forms from '@angular/forms';
import { FormsModule  } from '../forms/forms.module';

@NgModule({
  declarations: [
    DayopsComponent, 
    PostopsComponent, 
    PreopsComponent,
    ExambaseComponent
  ],
  imports: [
    CommonModule,
    ExambaseRoutingModule,
    NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, 
  NbUserModule,
  FormsModule,
  NbIconModule ,
  NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ExambaseModule { }
