import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  NbStepperModule,
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
   
  ]
})
export class ExambaseModule { }
