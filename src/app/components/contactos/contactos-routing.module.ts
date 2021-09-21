import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsResolver } from 'src/app/resolvers/contacts.resolver';
import { UsersResolver } from 'src/app/resolvers/users.resolver';
import { ContactosComponent } from '../contactos/contactos.component';

const routes: Routes = [
  {
    path: 'contactos',
    component: ContactosComponent,
    resolve: {
      ContactsResolver,
      UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
