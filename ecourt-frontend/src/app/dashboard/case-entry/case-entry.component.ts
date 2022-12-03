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
  id:string = '';

  onShowUploadDocs(data: { status: boolean, id: string}){
    this.showAddDetails = !data.status;
    this.showUploadDocs = data.status;
    this.id = data.id;
  }
  onHide(data: { status: boolean}){
    this.showUploadDocs = !data.status;
    this.showAddDetails = data.status;
  }
}
