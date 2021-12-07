import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: User;
  displayedColumns: string[] = ['name', 'xp-level'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((user: any) => this.user = user.user);
    // this.user = this.route.snapshot.data[ResolversEnum.USUARIO].user;
  }

  editarPerfil() {
    this.router.navigate(['/perfil/editar', this.route.snapshot.params['id']])
  }

}
