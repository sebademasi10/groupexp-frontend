export class Menu {
    id: number;
    nombre: string;
    path: string;
    icon: string;
    subMenu: Menu[];
    activo: boolean;
  
    constructor(id?: number,
                nombre?: string,
                path?: string,
                icon?: string,
                subMenu?: Menu[],
                activo?: boolean) {
      this.id = id;
      this.nombre = nombre;
      this.path = path;
      this.icon = icon;
      this.subMenu = subMenu;
      this.activo = activo;
    }
  }
  