import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {CurriculumSetupComponent} from '../curriculum-setup/curriculum-setup.component';
import { CurriculumComponent } from './curriculum/curriculum.component';

const routes: Routes = [
  {
  path: '',
  component: CurriculumSetupComponent,
  children: [
    {
      path: 'curriculum',
      component: CurriculumComponent,
    },

  ],
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class CurriculumSetupRoutingModule { }
