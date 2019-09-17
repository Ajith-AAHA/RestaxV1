import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseComponent} from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
  path: '',
  component: CourseComponent,
  children: [
    {
      path: 'course',
      component: CourseComponent,
    },
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
exports: [RouterModule],
})
export class CourseConfigurationRoutingModule { }
