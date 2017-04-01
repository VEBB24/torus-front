import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { InstallationComponent } from './installation/installation.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ProgressComponent } from './progress/progress.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'progress', canActivate: [AuthGuard], component: ProgressComponent },
  { path: 'installation', canActivate: [AuthGuard], component: InstallationComponent},
  { path: 'configuration', canActivate: [AuthGuard], component: ConfigurationComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InstallationComponent,
    ConfigurationComponent,
    ProgressComponent,
    LoginComponent,
    PageNotFoundComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
