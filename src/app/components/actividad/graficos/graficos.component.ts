import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscriber, Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit, OnDestroy {
  activitiesSubscription$: Subscription;
  activities: Activity[];
  barChartOptions: ChartOptions = {
    responsive: true,
    defaultColor: 'blue',
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  }
  public barChartLabels: Label[]
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 40, 1], label: 'Cantidad de actividades' },
  ];

  constructor(private activityService: ActividadService) {
  }

  ngOnInit(): void {
    this.activitiesSubscription$ = this.activityService.getAll().subscribe((activities) => {
      this.activities = activities;
      const activitiesAmountOnSameDay = this.getActivitiesAmountOnSameDay()
      this.barChartLabels = Object.keys(activitiesAmountOnSameDay);
      this.barChartData[0].data = Object.values(activitiesAmountOnSameDay);
    });
  }

  ngOnDestroy() {
    this.activitiesSubscription$.unsubscribe();
  }

  getDayNames() {
    const formatter = Intl.DateTimeFormat('es-AR', { weekday: 'short' });
    let days = this.activities.map((activity) => formatter.format(new Date(activity.startDate)))
    return [...new Set(days)];
  }

  getActivitiesAmountOnSameDay() {
    const formatter = Intl.DateTimeFormat('es-AR', { weekday: 'short' });
    const counts: Object = {};
    this.activities.forEach(function (activity) { counts[formatter.format(new Date(activity.startDate))] = (counts[formatter.format(new Date(activity.startDate))] || 0) + 1; });
    return counts;
  }

}
