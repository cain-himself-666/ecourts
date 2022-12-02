import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CaseEntryComponent {
  title = 'Case Entry'
  showAddDetails: boolean = true;
  showUploadDocs: boolean = false;

  onShowUploadDocs(data: { status: boolean}){
    this.showAddDetails = !data.status;
    this.showUploadDocs = data.status;
  }
  onHide(data: { status: boolean}){
    this.showUploadDocs = !data.status;
    this.showAddDetails = data.status;
  }
}
