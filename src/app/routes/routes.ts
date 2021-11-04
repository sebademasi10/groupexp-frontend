import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { LayoutComponent } from '../core/layout/layout/layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../components/components.module').then(
            (h) => h.ComponentsModule
          ),
      },
      {
        path: 'contactos',
        loadChildren: () =>
          import('../components/contactos/contactos.module').then(
            (h) => h.ContactosModule
          )
      },
      {
        path: 'medios-movilidad',
        loadChildren: () =>
          import('../components/medios-movilidad/medios-movilidad.module').then(
            (h) => h.MediosMovilidadModule
          )
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then(
            (h) => h.AuthModule
          )
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../components/perfil/perfil.module').then(
            (h) => h.PerfilModule
          )
      },
      {
        path: 'actividad',
        loadChildren: () =>
          import('../components/actividad/actividad.module').then(
            (h) => h.ActividadModule
          )
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // Not found
  { path: '**', redirectTo: 'home' },
];
