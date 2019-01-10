import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
import { HomePageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
