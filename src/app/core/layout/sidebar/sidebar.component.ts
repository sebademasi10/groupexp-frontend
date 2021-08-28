import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Menu } from '../../../models/menu.model';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {
  animateSubText,
  animateText,
  animateTextTraslate,
  onSideNavChange
} from '../../../shared/animations/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange, animateText, animateTextTraslate, animateSubText]
})
export class SidebarComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<boolean> = new EventEmitter();
  menuItems: Menu[] = [];
  isExpanded = true;
  showSubmenu = true;
  isShowing = false;
  showSubSubMenu = false;
  showFiller = false;
  public sideNavState = false;
  public linkText = false;

  constructor(private router: Router,
  ) {
    this.menuItems = [
      {
        id: 1,
        nombre: "Contactos",
        path: null,
        icon: "person",
        subMenu: [
          {
            id: 2,
            nombre: "Agregar",
            path: "/contactos/agregar",
            icon: "group_add",
            subMenu: [

            ],
            activo: true,
          },
        ],
        activo: true,
      },
      {
        id: 1,
        nombre: "Medios de movilidad",
        path: null,
        icon: "directions_car",
        subMenu: [
          {
            id: 2,
            nombre: "Agregar",
            path: "/medios-movilidad/agregar",
            icon: "add_circle_outline",
            subMenu: [

            ],
            activo: true,
          },
        ],
        activo: true,
      },
    ]
  }


  ngOnInit(): void {
  }

  navigate(path: string) {
    if (path && path != '/') {
      this.router.navigate([`${path}`]);
    }
  }

  activarItem(item: Menu) {
    this.menuItems.map((x) => {
      if (x.activo && item.id !== x.id) {
        x.activo = false;
      }
    });
    item.activo = !item.activo;
  }


  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 300);
  }

  activarSubItem(subItem: Menu) {
    this.menuItems.map((x) => {
      x.subMenu.map(s => {
        if (s.activo && subItem.id !== s.id) {
          s.activo = false;
        }
      });
    });
    subItem.activo = !subItem.activo;
  }
}
