import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CasedetailsRoutingModule } from './casedetails-routing.module';
import { CasedetailsComponent } from './casedetails.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CasedetailsComponent
  ],
  imports: [
    CommonModule,
    CasedetailsRoutingModule,
    UtilitiesModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class CasedetailsModule { }
