import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CauseListRoutingModule } from './cause-list-routing.module';
import { CauseListComponent } from './cause-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CauseListComponent
  ],
  imports: [
    CommonModule,
    CauseListRoutingModule,
    FormsModule
  ]
})
export class CauseListModule { }
