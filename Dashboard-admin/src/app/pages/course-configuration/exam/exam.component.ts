import { Component, OnInit } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
@Component({
  selector: 'ngx-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  // statuses: NbComponentStatus[] = [ 'primary' ];
  // shapes: NbComponentShape[] = [ 'rectangle' ];
  // sizes: NbComponentSize[] = [  'giant' ];

  constructor() { }

  ngOnInit() {
  }

  CardContent= ['This page is used to manage the Exam operations'];

  PreTitle= ['Pre Exam Ops'];
  ExamTitle= ['Exam Day Ops'];
  PostTitle= ['Post Exam Ops'];
  ExamModule: boolean = true;
  setexam: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = false;
  setexam1: boolean = false;
  setexam2: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;
  papers:boolean = false;
  slots:boolean = false;
  exam:boolean = false;
  marks:boolean = false;
  pwt:boolean =false;
  syllabus :boolean = false;
  students :boolean = false;
  seating :boolean = false;
  pwi:boolean= false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  Exams() {
    this.setexam = true;
    this.setexam1 = false;
    this.setexam2 = false;
    this.Unknownstate = false;
    this.Blocktree = false;
    this.papers = false;
    this.slots = false;
    
  }
  
  Exams1() {
    this.setexam = false;
    this.setexam1 = true;
    this.setexam2 = false;
    this.Unknownstate = false;
    this.Blocktree = false;
  
  }
  Exams2() {
    this.setexam = false;
    this.setexam1 = false;
    this.setexam2 = true;
    this.Unknownstate = false;
    this.Blocktree = false;
  
  }
assignpapers(){
  this.papers = true;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
  this.dropdownList = [
    { item_id: 1, item_text: 'ME101-Basics of Mechanical Engineering' },
    { item_id: 2, item_text: 'ME102-Basics of Mechanical Engineering' },
    { item_id: 3, item_text: 'ME103-Basics of Mechanical Engineering' },
    { item_id: 4, item_text: 'ME104-Basics of Mechanical Engineering' },
    { item_id: 5, item_text: 'ME105-Basics of Mechanical Engineering' }
  ];
  this.selectedItems = [
    { item_id: 3, item_text: 'ME104-Basics of Mechanical Engineering' },
    { item_id: 4, item_text: 'ME105-Basics of Mechanical Engineering' }
  ];
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
}
onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}

createslots(){
  this.papers = false;
  this.slots = true;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
scheduleexam(){
  this.papers = false;
  this.slots = false;
  this.exam = true;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
setmarks(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = true;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
assignpwt(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = true;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
setsyllabus(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = true;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
setstudents(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = true;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
}
setseating(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = true;
  this.pwi = false;
  this.setexam = false;
}
assignpwi(){
  this.papers = false;
  this.slots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = true;
  this.setexam = false;
}
}
