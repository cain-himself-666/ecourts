import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseEntryComponent } from './case-entry.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { UploadDocsComponent } from './upload-docs/upload-docs.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/case-entry/view', pathMatch: 'full'},
  { path: '', component: CaseEntryComponent,
    children: [
      { path: 'view', component: ViewComponent},
      { path: 'add', component: AddDetailsComponent },
      { path: 'upload/:id', component: UploadDocsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseEntryRoutingModule { }
