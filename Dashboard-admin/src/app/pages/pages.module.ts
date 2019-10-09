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

<<<<<<< HEAD
import { GradingsetupComponent } from './gradingsetup/gradingsetup.component';
import { SeasonsetupComponent } from './seasonsetup/seasonsetup.component';
import { SeatingconfigComponent } from './seatingconfig/seatingconfig.component';
import { StudentbaseComponent } from './studentbase/studentbase.component';
=======
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
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
<<<<<<< HEAD
    GradingsetupComponent,
    SeasonsetupComponent,
    SeatingconfigComponent,
    StudentbaseComponent,
   
=======
    
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
  ],
})
export class PagesModule {
}
