import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, AlertController, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
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
import { UserService } from '../services/UserService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.page.html',
  styleUrls: ['./preguntas-seguridad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  //imports: [IonicModule, CommonModule, FormsModule,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,PieGridComponent]

})
export class PreguntasSeguridadPage implements OnInit {
  preguntas: Pregunta[] = []; // Usa la clase Pregunta en lugar de un array sin estructura definida
  respuestas: { [key: string]: string } = {}; // Objeto para almacenar las respuestas
  usuario: any;

  constructor(private http: HttpClient, private userService: UserService, private alertController: AlertController, private router: Router
  ) { }

  ngOnInit() {
    this.getPreguntasSeguridad();
    this.usuario = this.userService.getUsuario();
    if (this.usuario) {
      console.log('Usuario pito seguridad :', this.userService.getUsuario().dni);
    }
  }

  getPreguntasSeguridad() {
    this.http.get<any[]>('http://192.168.1.247/preguntas-seguridad.php?query=preguntas').subscribe(
      data => {
        this.preguntas = data.map(item => new Pregunta(item.id, item.pregunta));
        this.preguntas.forEach(pregunta => {
          this.respuestas[pregunta.id] = '';
        });
      },
      error => {
        console.error('Error al obtener las preguntas de seguridad:', error);
      }
    );
  }
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8'
  };

  enviarRespuestas() {

    const url = 'http://192.168.1.247/preguntas-seguridad.php?query=respuestas';
    const body = {
      dni:  this.userService.getUsuario().dni,
      respuestas: this.respuestas
    };

    this.http.post<any>(url, body).subscribe(
      (data) => {
        console.log('Respuestas enviadas correctamente: ', data);
        this.presentAlert('Respuestas enviadas', 'Tus respuestas se han enviado correctamente.');
        console.log(this.respuestas);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al enviar respuestas: ', error);
        this.presentAlert('Error', 'Ha ocurrido un error al enviar tus respuestas.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
