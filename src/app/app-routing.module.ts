import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
import { HomePageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/user/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { JohnTravoltaComponent } from './pages/404/johnTravolta.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ViewProfileComponent } from './pages/user/viewprofile/viewprofile.component';
import { DisplayListYTSComponent } from './pages/displaylistyts/displaylistyts.component';
import { DisplayListArchiveComponent } from './pages/displaylistarchive/displaylistarchive.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/user', component: ViewProfileComponent },
  { path: 'listyts', component: DisplayListYTSComponent},
  { path: 'listarchive', component: DisplayListArchiveComponent},
  { path: '**', component: JohnTravoltaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
