import { Component, OnInit,Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grouped-vertical-chart',
  templateUrl: './grouped-vertical-chart.component.html',
  styleUrls: ['./grouped-vertical-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class GroupedVerticalChartComponent  implements OnInit {

  @Input() view: any;
  multi: any[] = [];
  @Input('data') set setData(data: any[]) {
    this.multi = data;
  }
 
  gradient: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'X Axis';
  yAxisLabel: string = 'Y Axis';
  legendTitle: string = 'Legend';
  showLegend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;

  colorScheme: any = {
    domain: ['#FF5733', '#FF8C00', '#FFA500', '#FFD700', '#FF6347', '#FF4500']
  };

  constructor() {}

  ngOnInit() {}

  onSelect(event: any ) {
    console.log(event);
  }
  onActivate(event: any) {
    // Tu lógica para el evento activate
  }

  onDeactivate(event: any) {
    // Tu lógica para el evento deactivate
  }
}
