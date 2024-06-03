import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class TreeMapChartComponent  implements OnInit {
 // options
 gradient = true;
 animations = true;
 @Input() view: any;
 @Input() legendPosition: any = 'below';
 single: any[] = [];
 @Input('data') set setData(data: any[]) {
   this.single = data;
 }

 colorScheme: any = {
  domain: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
 };

 constructor() { }

 ngOnInit() { }

 onSelect(event: any) {
   console.log(event);
 }

 labelFormatting(c: any): string {
   return `${(c.label)}`;
 }
}