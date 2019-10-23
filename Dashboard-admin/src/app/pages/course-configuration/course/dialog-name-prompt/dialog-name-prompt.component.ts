import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {}
  @Output() click: EventEmitter<any> = new EventEmitter();
  cancel() {
    this.ref.close();
  }


}
