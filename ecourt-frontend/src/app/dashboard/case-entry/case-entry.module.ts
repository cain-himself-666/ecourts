import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseEntryRoutingModule } from './case-entry-routing.module';
import { CaseEntryComponent } from './case-entry.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { UploadDocsComponent } from './upload-docs/upload-docs.component';


@NgModule({
  declarations: [
    CaseEntryComponent,
    AddDetailsComponent,
    UploadDocsComponent
  ],
  imports: [
    CommonModule,
    CaseEntryRoutingModule,
  ]
})
export class CaseEntryModule { }
