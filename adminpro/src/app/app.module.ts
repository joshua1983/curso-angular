import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotpagefoundComponent } from './shared/notpagefound/notpagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotpagefoundComponent,
    DashboardComponent,
    Graficas1Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ProgressComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
