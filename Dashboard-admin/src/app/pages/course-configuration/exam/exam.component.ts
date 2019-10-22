import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'ngx-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  entryComponents: [DayCellComponent],
})
export class ExamComponent implements OnInit {

     date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

 

  ngOnInit() {
    this.getAllpapers();
  }


  getAllpapers(){}

  CardContent= ['This page is used to manage the Exam operations'];

  PreTitle= ['Pre Exam Ops'];
  ExamTitle= ['Exam Day Ops'];
  PostTitle= ['Post Exam Ops'];
  ExamModule: boolean = true;
  setexam: boolean = false;
  // course: true;
  EditRecord: boolean = true;
  EditActions: boolean = true;
  setexam1: boolean = false;
  setexam2: boolean = false;
  Blocktree: boolean = false;
  Unknownstate: boolean = true;
  asp:boolean = false;
  createslots:boolean = false;
  exam:boolean = false;
  marks:boolean = false;
  pwt:boolean =false;
  syllabus :boolean = false;
  students :boolean = false;
  seating :boolean = false;
  pwi:boolean= false;
  priya: boolean=false;
  paper1: any;
  paper2: any;
  calendar:boolean=false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  papers:  Array<any> = [];
  Exams() {
    this.setexam = true;
    this.setexam1 = false;
    this.setexam2 = false;
    this.Unknownstate = false;
    this.Blocktree = false;
    this.asp = false;
    this.createslots = false;
    
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
  this.asp = true;
  this.createslots = false;
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

createslot(){
  this.asp = false;
  this.createslots = true;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = false;
  this.setexam = false;
  this.calendar= false;
}
addField(){
  this.paper1 = '';
  this.paper2= '';
  this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
}
deleteFieldValue(index) {
  this.fieldArray.splice(index, 1);
}

// editpapers(paper1: any,paper2: any) {
//   paper1.editable = !paper1.editable;
//   paper2.editable = !paper2.editable;
//   this.EditRecord = false;
//   this.EditActions = true;
// }
// Cancel(paper) {
//   paper.editable = !paper.editable;
//   this.EditRecord = true;
//   this.EditActions = false;
// }


/**
 * @param paper1
 * @param paper2
 */

addpaper(paper1,paper2){

}

scheduleexam(){
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
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
  this.asp = false;
  this.createslots = false;
  this.exam = false;
  this.marks = false;
  this.pwt = false;
  this.syllabus = false;
  this.students = false;
  this.seating = false;
  this.pwi = true;
  this.setexam = false;
}
calendarview(){
  this.exam = false;
this.priya= true;
  this.calendar= true;
}

@ViewChild('reportContent',{static: false}) reportContent: ElementRef;
exportaspdf(){
  
  // console.log("hi this is priya");
  // const doc = new jsPDF();
  // doc.text('hi this is priya',15,15);
  // doc.save('first.pdf');
  const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.reportContent.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('restax' + '.pdf');
  }
}

