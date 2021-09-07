import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<boolean> = new EventEmitter();
  hide = false;
  loggedUserName: string;
  userId: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loggedUserName = this.authService.getLoggedUser();
    this.userId = this.authService.getUserId();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit(true);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    this.authService.logout();
  }

  getfullName() {
    return `${this.loggedUserName}` || '';
  }

  change() {
    this.toggleSideBarForMe.emit(false);
    this.router.navigate(['login']);
  }

  myData() {
    this.router.navigate(['perfil/ver', this.userId])
  }
}
