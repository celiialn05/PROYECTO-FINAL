import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({ // para hacer mas componentes ionic g c components/vertical-bar-chart 
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class VerticalBarChartComponent  implements OnInit {
// options
showXAxis = true;
showYAxis = false;
gradient = true;
showLegend = false;
showXAxisLabel = true;
xAxisLabel = '';
showYAxisLabel = true;
yAxisLabel = 'Euros';
@Input() view: any;
@Input() legendPosition: any = LegendPosition.Right;
single: any[] = [];
@Input('data') set setData(data: any[]) {
  this.single = data;
}
// showDataLabel = false;


colorScheme: any = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

  constructor() { }

  ngOnInit() {
  }
  onSelect(event: any ) {
    console.log(event);
  }
}
