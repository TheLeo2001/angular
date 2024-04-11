import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component'; // Import TeamsComponent

const routes: Routes = [
  { path: 'teams', component: TeamsComponent }, // Route for TeamsComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
