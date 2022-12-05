import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasedetailsRoutingModule } from './casedetails-routing.module';
import { CasedetailsComponent } from './casedetails.component';
import { UtilitiesModule } from '../utilities/utilities.module';


@NgModule({
  declarations: [
    CasedetailsComponent
  ],
  imports: [
    CommonModule,
    CasedetailsRoutingModule,
    UtilitiesModule
  ]
})
export class CasedetailsModule { }
