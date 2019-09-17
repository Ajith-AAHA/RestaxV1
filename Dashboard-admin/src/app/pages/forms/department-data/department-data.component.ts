import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nb-stepper-linear',
  templateUrl: './department-data.component.html',
  styleUrls: ['./department-data.component.scss'],
})
export class DepartmentDataComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  CardContent= ['This page is used to manipulate your institues  Department/Grades Database You can create,edit,delete a Department/Grades.'];
  elements: any = [
    {id: 1, Coursename: 'Bachelor of Technology', terms: '08', Duration: '4 years', Sectionsineachyear: '03,02,01'},
    {id: 2, Coursename: 'Master of Technology', terms: '06', Duration: '2 years', Sectionsineachyear: '02,02'},
    {id: 3, Coursename: 'Doctrate of Philosophy', terms: '02', Duration: '3 years', Sectionsineachyear: '01,01,01'},
  ];

  headElements = ['ID', 'Course name', '#Terms', 'Duration', '#Sections in each year'];
  tableHead = ['Department of Mechanical Engineering'];
  stepperFirst: FormGroup;
  stepperSecond: FormGroup;
  stepperThird: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stepperFirst = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.stepperSecond = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.stepperThird = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  onFirstSubmit() {
    this.stepperFirst.markAsDirty();
  }
  onSecondSubmit() {
    this.stepperSecond.markAsDirty();
  }
  onThirdSubmit() {
    this.stepperThird.markAsDirty();
  }
}
