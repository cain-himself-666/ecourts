import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CauseListComponent } from './cause-list.component';

const routes: Routes = [{ path: '', component: CauseListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CauseListRoutingModule { }
