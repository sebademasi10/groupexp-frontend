import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data[ResolversEnum.USUARIO].user;
  }

  editarPerfil() {
    this.router.navigate(['/perfil/editar', this.route.snapshot.params['id']])
  }

}
