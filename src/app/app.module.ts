import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatIconModule
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Our components
import { HomePageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/user/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JohnTravoltaComponent } from './pages/404/johnTravolta.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ViewProfileComponent } from './pages/user/viewprofile/viewprofile.component';
import { DisplayListYTSComponent } from './pages/displaylistyts/displaylistyts.component';
import { DisplayListArchiveComponent } from './pages/displaylistarchive/displaylistarchive.component';
import { VerifyComponent } from './pages/user/verify/verify.component';
import { ForgotPasswordComponent } from './pages/user/forgotpass/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    JohnTravoltaComponent,
    ProfileComponent,
    ViewProfileComponent,
    DisplayListYTSComponent,
    DisplayListArchiveComponent,
    ForgotPasswordComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
