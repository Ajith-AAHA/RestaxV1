import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseConfigurationComponent} from './course-configuration.component';
import {CourseComponent} from './course/course.component';
import { ExamComponent } from './exam/exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
  path: '',
  component: CourseConfigurationComponent,
  children: [
    {
      path: 'course',
      component: CourseComponent,
    },
    {
      path: 'exam',
      component: ExamComponent,
    },
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CourseConfigurationRoutingModule { }
