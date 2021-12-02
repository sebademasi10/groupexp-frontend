import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactosService } from 'src/app/services/contactos.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  selectedOption: string;

  public contacts: User[];
  public contactsAmount: number;
  private _userId: string;

  displayedColumns: string[] = ['nombreApellido', 'acciones'];

  myControl = new FormControl();
  users: User[];
  filteredOptions: Observable<User[]>;

  constructor(
    private route: ActivatedRoute,
    private contactosService: ContactosService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this._userId = this.route.snapshot.params['id'];
    this.users = this.route.snapshot.data[ResolversEnum.USUARIOS].users.filter((user) => user.uid !== this.authService.getUserId());
    this.contacts = this.route.snapshot.data[ResolversEnum.CONTACTOS].contacts;
    // this.contacts = this.route.snapshot.data[ResolversEnum.CONTACTOS].contacts.filter((contact) => contact !== null);
    //  let contacts = this.contactosService.get(this.authService.getLoggedUser().uid).subscribe(());
    //  console.log('contacts', contacts);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChange(option: MatAutocompleteSelectedEvent) {
    this.selectedOption = option.option.value;
  }

  agregarContacto() {
    this.contactosService.add(this.authService.getUserId(), this.selectedOption).subscribe((data: any) => {
      this.contacts = data.contacts;
    })
  }

  remove(element) {
    const loggedUser = this.authService.getLoggedUser();
    console.log('contact', loggedUser);
    console.log('eliminar', element);
    this.contactosService.remove(loggedUser.uid, element.id).subscribe((data: any) => {
      this.contacts = data.contacts;
    })
  }

}
