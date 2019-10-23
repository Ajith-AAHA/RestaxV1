import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { GradingsetupComponent } from './gradingsetup/gradingsetup.component';
import { SeasonsetupComponent } from './seasonsetup/seasonsetup.component';
import { StudentbaseComponent } from './studentbase/studentbase.component';
import { SeatingconfigComponent } from './seatingconfig/seatingconfig.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },

    {
      path: 'exambase',
      loadChildren: () => import('./exambase/exambase.module')
        .then(m => m.ExambaseModule),
    },

    {
      path: 'facultybase',
      loadChildren: () => import('./facultybase/facultybase.module')
        .then(m => m.FacultybaseModule),
    },

    {
      path: 'gradingsetup',
      component: GradingsetupComponent,
    },

    {
      path: 'seasonsetup',
      component: SeasonsetupComponent,
    },

    // {
    //   path: 'studentbase',
    //   component: StudentbaseComponent,
    // },

    {
      path: 'seatingconfig',
      component: SeatingconfigComponent,
    },
    {
      path:'test',
      component:TestComponent,
    },
  
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'course-configuration',
      loadChildren: () => import('./course-configuration/course-configuration.module')
      .then(m => m.CourseConfigurationModule),
    },
    {
      path: 'season-setup',
      loadChildren: () => import('./season-setup/season-setup.module')
        .then(m => m.SeasonSetupModule),
    },
    {
      path: 'curriculum-setup',
      loadChildren: () => import('./curriculum-setup/curriculum-setup.module')
      .then(m => m.CurriculumSetupModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'faculty',
      loadChildren: () => import('./faculty/faculty.module')
        .then(m => m.FacultyModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
