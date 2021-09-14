import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user: User;
  profileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackService: SnackBarService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['UserResolver'].user;
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
    })
  }

  saveChanges() {
    this.user.name = this.profileForm.value.name;
    this.user.surname = this.profileForm.value.surname;

    this.userService.update(this.route.snapshot.params['id'], this.user).subscribe(() => {
      this.snackService.openSnackBar('¡Usuario actualizado con éxito!', true);
      this.authService.getLoggedUser();
      this.router.navigate(['/perfil/ver', this.route.snapshot.params['id']]);
    })
  }

}
