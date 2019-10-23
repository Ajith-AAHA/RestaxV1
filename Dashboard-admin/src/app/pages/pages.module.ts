import { NgModule } from '@angular/core';
import { NbMenuModule,NbCardModule } from '@nebular/theme';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {FormsModule} from '@angular/forms';

import { GradingsetupComponent } from './gradingsetup/gradingsetup.component';
import { SeasonsetupComponent } from './seasonsetup/seasonsetup.component';
import { SeatingconfigComponent } from './seatingconfig/seatingconfig.component';
import { StudentbaseComponent } from './studentbase/studentbase.component';
import { TestComponent } from './test/test.component';
@NgModule({
  imports: [
  PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    NbCardModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [
    PagesComponent,
    GradingsetupComponent,
    SeasonsetupComponent,
    SeatingconfigComponent,
    StudentbaseComponent,
    TestComponent
   
  ],
})
export class PagesModule {
}
