import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  public inputType = "password";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    let loginData = this.loginForm.value;
    loginData.email = loginData.email.toLowerCase().replace(/ /g, '');
    this.authService.login(loginData)
      .subscribe(data => {
        localStorage.setItem('token', data['token'])
        this.router.navigateByUrl('/');

      },
        (error) => {
          error.error.errors ? this.snackBarService.openSnackBar(error.error.errors[0].msg, false) : this.snackBarService.openSnackBar(error.error.msg, false);

        }
      )

  }

  toggleInputType() {
    this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password';
  }

}
