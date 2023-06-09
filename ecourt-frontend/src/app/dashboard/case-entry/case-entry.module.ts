import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseEntryRoutingModule } from './case-entry-routing.module';
import { CaseEntryComponent } from './case-entry.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { UploadDocsComponent } from './upload-docs/upload-docs.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    CaseEntryComponent,
    AddDetailsComponent,
    UploadDocsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CaseEntryRoutingModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class CaseEntryModule { }
