import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from 'src/app/resolvers/user.resolver';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'ver/:id',
    component: ViewComponent,
    resolve: { UserResolver }
  },
  {
    path: 'editar/:id',
    component: EditComponent,
    resolve: { UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
