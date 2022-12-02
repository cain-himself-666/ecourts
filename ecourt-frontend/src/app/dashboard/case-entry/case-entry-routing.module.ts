import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseEntryComponent } from './case-entry.component';

const routes: Routes = [
  { path: '', component: CaseEntryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseEntryRoutingModule { }
