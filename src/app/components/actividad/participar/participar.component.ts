import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(
    private activitiesService: ActividadService
  ) { }

  ngOnInit(): void {
    this._activitiesSubscription = this.activitiesService.getAll().subscribe((activities: Activity[]) => {
      console.log(activities);
    })
  }

  ngOnDestroy(): void {
    this._activitiesSubscription.unsubscribe();
  }
}
