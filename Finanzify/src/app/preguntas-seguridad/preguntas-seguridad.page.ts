import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { PieGridComponent } from '../components/pie-grid/pie-grid.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { TreeMapChartComponent } from '../components/treemap-chart/treemap-chart.component';
import { NumberCardChartComponent } from '../components/number-card-chart/number-card-chart.component';
import { GaugeChartComponent } from '../components/gauge-chart/gauge-chart.component';
import { GroupedVerticalChartComponent } from '../components/grouped-vertical-chart/grouped-vertical-chart.component';

import { Pregunta } from './pregunta.model'; // Importa la clase Pregunta


@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.page.html',
  styleUrls: ['./preguntas-seguridad.page.scss'],
  standalone: true,
  //imports: [IonicModule, CommonModule, FormsModule]
  imports: [IonicModule, CommonModule, FormsModule,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,PieGridComponent]

})
export class PreguntasSeguridadPage implements OnInit {
  preguntas: Pregunta[] = []; // Usa la clase Pregunta en lugar de un array sin estructura definida
  respuestas: { [key: string]: string } = {}; // Objeto para almacenar las respuestas

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPreguntasSeguridad();
  }

  getPreguntasSeguridad() {
    this.http.get<any[]>('https://finanzify.sytes.net/preguntas-seguridad.php').subscribe(
      data => {
        // Mapea los datos del servidor a objetos de pregunta usando la clase Pregunta
        this.preguntas = data.map(item => new Pregunta(item.id, item.pregunta));

        // Inicializa las respuestas como cadenas vacías
        this.preguntas.forEach(pregunta => {
          this.respuestas[pregunta.id] = '';
        });

        console.log('Preguntas:', this.preguntas);
        console.log('Respuestas:', this.respuestas);
      },
      error => {
        console.error('Error al obtener las preguntas de seguridad:', error);
      }
    );
  }
}
