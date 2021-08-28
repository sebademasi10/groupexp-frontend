import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Session } from '../../../models/session.model';

@Component({
  selector: 'caja-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Output() changeRoleEvent = new EventEmitter<boolean>();
  session: Session;

  menu = 'Cerrar Sesi\u00F3n';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.session = this.authService.getSession();
    this.setSubscribers();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  closeSession(): void {
    this.authService.logout();
  }

  private setSubscribers(): void {
    this.authService.sessionChanged.subscribe((s) => {
      if (s) {
        this.session = s;
      }
    });
  }
}
