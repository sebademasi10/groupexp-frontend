import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { ICONBYMEANS } from 'src/app/enums/icon-by-means.enum';
import { Activity } from 'src/app/models/activity.model';
import { User } from 'src/app/models/user.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/shared/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.component.html',
  styleUrls: ['./participar.component.scss']
})
export class ParticiparComponent implements OnInit, OnDestroy {

  private _activitiesSubscription: Subscription;
  public activities: Activity[];
  public myActivities: Activity[];
  public otherActivities: Activity[];
  public ICONS = ICONBYMEANS;
  public activitiesLoaded$ = of(true);
  public loggedUserName: string;
  uid: string;
  loggedUser: User;
  showPanels = false;

  constructor(
    private activitiesService: ActividadService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private matDialog: MatDialog
  ) {
    this.loggedUserName = authService.getLoggedUserName();
  }

  ngOnInit(): void {
    this.uid = this.authService.getUserId();
    this.userService.getUser(this.uid).subscribe((user: any) => {
      this.loggedUser = user.user;
      this._activitiesSubscription = this.activitiesService.getAll().subscribe((activities: Activity[]) => {
        this.activities = activities;
        this.myActivities = this.getMyActivities();
        this.otherActivities = this.getOtherActivities();
        this.sortActivities();
        this.checkOwner();
        this.checkExipired();
        this.activitiesLoaded$ = of(this.activities.length === 0);
        this.showPanels = true;
      })
    })
  }
  getOtherActivities(): Activity[] {
    return this.activities.filter((activity: Activity) => {
      return this.loggedUser.meansOfTransportation.find(mot => {
        return mot.name === activity.meanOfTransportation;
      }) === undefined;
    })
  }
  getMyActivities(): Activity[] {
    return this.activities.filter((activity: Activity) => {
      return this.loggedUser.meansOfTransportation.find(mot => {
        return mot.name === activity.meanOfTransportation;
      }) !== undefined;
    })
  }
  checkExipired() {
    this.activities = this.activities.filter(activity => {
      return new Date(activity.startDate).toLocaleDateString() >= new Date().toLocaleDateString();
    })
  }
  sortActivities() {
    this.activities.sort((a: Activity, b: Activity) => a.startDate < b.startDate ? -1 : 1)
  }
  checkOwner() {
    this.activities.forEach(activity => {
      activity.isOwner = activity.creators.find((creator) => {
        return creator.uid === this.uid;
      }) !== undefined;
    })
  }

  public checkParticipant(activity: Activity) {
    const participant = activity.participants.find((participant) => {
      return participant.uid === this.uid;
    });

    return participant !== undefined;
  }

  eliminar(element: any) {
    let dialogRef = this.matDialog.open(ConfirmationComponent);
    dialogRef.componentInstance.message = `¿Cancelar actividad: ${element.title}?`
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.activitiesService.delete(element.uid).subscribe(
          () => { window.location.reload() }
        )
      }
    })
  }
  ngOnDestroy(): void {
    this._activitiesSubscription.unsubscribe();
  }

  navigate(uid: string) {
    this.router.navigate(['actividad/ver', uid]);
  }
}
