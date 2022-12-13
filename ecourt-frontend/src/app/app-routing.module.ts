import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'cases/:date', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule) },
  { path: 'case-details/:cnr', loadChildren: () => import('./casedetails/casedetails.module').then(m => m.CasedetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
