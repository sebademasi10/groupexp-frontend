import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<boolean> = new EventEmitter();
  hide = false;
  userName = 'Sebastián Demasi';
  constructor(private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit(true);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }


  change() {
    this.toggleSideBarForMe.emit(false);
    this.router.navigate(['login']);
  }

  myData() {
  }
}
