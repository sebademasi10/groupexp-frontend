import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.component.html',
  styleUrls: ['./participar.component.scss']
})
export class ParticiparComponent implements OnInit, OnDestroy {

  private _activitiesSubscription: Subscription;
  public activities: Activity[];

  constructor(
    private activitiesService: ActividadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._activitiesSubscription = this.activitiesService.getAll().subscribe((activities: Activity[]) => {
      this.activities = activities;
    })
  }

  ngOnDestroy(): void {
    this._activitiesSubscription.unsubscribe();
  }

  navigate(uid: string) {
    this.router.navigate(['actividad/ver', uid]);
  }
}
