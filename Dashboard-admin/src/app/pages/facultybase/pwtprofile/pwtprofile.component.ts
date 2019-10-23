import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pwtprofile',
  templateUrl: './pwtprofile.component.html',
  styleUrls: ['./pwtprofile.component.scss']
})
export class PwtprofileComponent implements OnInit {
  downloadFile(){
    const link = document.createElement('a');
    link.download = 'Artboard94.png';
    link.href = './NISHA/Downloads/Final1/PWE-Profile/Artboard94.png';
    link.click();
}
  constructor() { }

  ngOnInit() {
  }

}
