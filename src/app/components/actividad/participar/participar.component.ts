import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { ICONBYMEANS } from 'src/app/enums/icon-by-means.enum';
import { Activity } from 'src/app/models/activity.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.component.html',
  styleUrls: ['./participar.component.scss']
})
export class ParticiparComponent implements OnInit, OnDestroy {

  private _activitiesSubscription: Subscription;
  public activities: Activity[];
  public ICONS = ICONBYMEANS;
  public activitiesLoaded$ = of(true);
  public loggedUserName: string;

  constructor(
    private activitiesService: ActividadService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loggedUserName = authService.getLoggedUser();
  }

  ngOnInit(): void {

    this._activitiesSubscription = this.activitiesService.getAll().subscribe((activities: Activity[]) => {
      this.activities = activities;
      this.activitiesLoaded$ = of(activities.length === 0);
    })
  }

  ngOnDestroy(): void {
    this._activitiesSubscription.unsubscribe();
  }

  navigate(uid: string) {
    this.router.navigate(['actividad/ver', uid]);
  }
}
