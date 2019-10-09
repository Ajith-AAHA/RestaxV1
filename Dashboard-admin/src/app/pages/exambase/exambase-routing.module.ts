import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExambaseComponent } from './exambase.component';
import { DayopsComponent } from './dayops/dayops.component';
import { PostopsComponent } from './postops/postops.component';
import { PreopsComponent } from './preops/preops.component';

const routes: Routes = [{
  path: '',
  component: ExambaseComponent,
  children: [
    {
      path: 'dayops',
      component: DayopsComponent,
    },
    {
      path: 'postops',
      component: PostopsComponent,
    },
    {
      path: 'preops',
      component: PreopsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExambaseRoutingModule { }
