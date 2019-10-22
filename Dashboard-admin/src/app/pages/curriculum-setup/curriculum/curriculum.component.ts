import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Apollo} from 'apollo-angular';
import * as Query from './query';
import 'rxjs/add/operator/map';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { query } from '\@angular/animations';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit {

  customColumn = 'name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn];

  dataSource: NbTreeGridDataSource<FSEntry>;

  constructor(private apollo: Apollo,
    private modalService: BsModalService, dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  modalRef: BsModalRef;
  papers:  Array<any> = [];
  paper: any = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  CurriculumTitle = 'This page is used to manipulate Course Curriculum data';

  PaperTitle = 'Set Papers';
  SetPapers: boolean = false;
  SetSyllabus: boolean = false;
  Exportdata: boolean = false;
  Courses= ['01-Engineering', '02-Computer Science', '03-Chemistry', '04-Physics', '05-English'];
  Departments = ['ME', 'MTECH', 'BE', 'BTECH', 'MECH', 'CIVIL', 'ECE', 'EEE', 'CSE'];
  Level = ['B.Tech', 'Electrical Engineering', 'AutoMobile Engineering', 'Computer Engineering'];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  Year= ['01', '02', '03', '04'];
  Term = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '08'];
  Cores = ['Core', 'Non-Core'];
  appearances: NbSelectAppearance[] = [ 'outline', 'filled', 'hero' ];
  HeadElements = ['Department', 'Level', 'Year', 'Term', 'Type'];
  PaperElements = ['Actions', 'ID', 'ShortCode', 'Paper Name', 'Credits'];
  shortcode: any;
  papername: any;
  credits: any;
  EditRecord: boolean = true;
  EditActions: boolean = false;


ngOnInit() {
  // this.getAllpapers();
}

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Basics of Mechanical Engineering', size: '1.8 MB', items: 5, kind: 'dir' },
      children: [
                {
          data: { name: 'Unit -1: Units and Measurements', kind: 'dir', size: '466 KB', items: 3 },
          children: [
            {
              data: { name: 'Chapter-1: Fundamentals of measurements', kind: 'dir', size: '400 KB', items: 2 },
              children: [
                {
                  data: { name: 'Introduction', kind: 'dir', size: '100 KB', items: 1 },
                  children: [
                    { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
                  ],
                },
                {
                  data: { name: 'Types of Units', kind: 'dir', size: '100 KB', items: 1 },
                  children: [
                    { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
                  ],
                },
                {
                  data: { name: 'Fundamental Units', kind: 'dir', size: '100 KB', items: 1 },
                  children: [
                    { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
                  ],
                },
                {
                  data: { name: 'Derived Units', kind: 'dir', size: '300 KB', items: 2 },
                  children: [
                    { data: { name: 'report-2.doc', kind: 'doc', size: '290 KB' } },
                    { data: { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' } },
                  ],
                },
              ],
            },

          ],
        },

      ],
    },

     ];
addPaperValue() {
  this.shortcode = '';
  this.papername = '';
  this.credits = '';
  this.fieldArray.push(this.newAttribute);
  this.newAttribute = {};
}
deletePaperValue(index: number) {
this.fieldArray.splice(index, 1);
}
Papers() {
this.SetPapers = true;
this.SetSyllabus = false;
this.Exportdata = false;
}
Syllabus() {
  this.SetSyllabus = true;
  this.SetPapers = false;
  this.Exportdata = false;
}
ExportData() {
  this.SetSyllabus = false;
  this.SetPapers = false;
  this.Exportdata = true;
}


addsyllabus() {
    console.log('checked1');
  }
  deletesyllabus() {
    console.log('checked3');
  }

editDomain(domain: any) {
  domain.editable = !domain.editable;
}



getShowOn(index: number) {
  const minWithForMultipleColumns = 400;
  const nextColumnStep = 100;
  return minWithForMultipleColumns + (nextColumnStep * index);
}
openModal(template: TemplateRef<any>) {
  this.shortcode = '';
  this.papername = '';
  this.credits = '';
  this.paper = {};
  this.modalRef = this.modalService.show(template);
}

// Close Modal
closeFirstModal() {
  this.modalRef.hide();
  this.modalRef = null;
}
}
@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>

      <nb-icon (click)="addsyllabus()" icon="plus-outline"></nb-icon>
      <nb-icon (click)="editDomain(domain)" icon="edit-outline"></nb-icon>
      <nb-icon (click)="deletesyllabus()" icon="trash-2-outline"></nb-icon>
    </ng-template>
  `,
})

export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  addsyllabus() {
    console.log('checked1');
  }
  deletesyllabus() {
    console.log('checked3');
  }
  // editDomain(domain: any) {
  //   domain.editable = !domain.editable;
  // }
  isDir(): boolean {
    return this.kind === 'dir';
  }
}
