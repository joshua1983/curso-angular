import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
  RouterModule,
  CommonModule,
  PipesModule
  ],
  declarations: [
    NotpagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    NotpagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})

export class SharedModule { }
