import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  { 
    path: '', component: DashboardComponent , children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
      { path: 'case-entry', loadChildren: () => import('./case-entry/case-entry.module').then(m => m.CaseEntryModule)},
      { path: 'cause-list', loadChildren: () => import('./cause-list/cause-list.module').then(m => m.CauseListModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
