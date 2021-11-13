import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { MaterialModule } from '../shared/material.module';
import { ApiUrlInterceptor } from './interceptors/api-url-base.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    LayoutModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    SidenavListComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ApiUrlInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SpinnerInterceptor
    },
  ]
})

export class CoreModule {
}
