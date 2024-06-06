import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, AlertController, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from './pregunta.model'; // Importa la clase Pregunta
import { UserService } from '../services/UserService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.page.html',
  styleUrls: ['./preguntas-seguridad.page.scss'],
  standalone: true,
 // imports: [IonicModule, CommonModule, FormsModule]
  imports: [IonicModule, CommonModule, FormsModule,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]

})
export class PreguntasSeguridadPage implements OnInit {
  preguntas: Pregunta[] = []; 
  respuestas: { [key: string]: string } = {}; 
  usuario: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPreguntasSeguridad();
    this.usuario = this.userService.getUsuario();
  }

  /* Función para traer las preguntas al formulario */
  getPreguntasSeguridad() {
    this.http.get<any[]>('https://finanzify.sytes.net/preguntas-seguridad.php?query=preguntas').subscribe(
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
  
  /* Función para enviar las respuestas */
  enviarRespuestas() {

    const url = 'https://finanzify.sytes.net/preguntas-seguridad.php?query=respuestas';
    const body = {
      dni:  this.userService.getUsuario().dni,
      respuestas: this.respuestas
    };

    this.http.post<any>(url, body).subscribe(
      (data) => {
        this.presentAlert('Respuestas enviadas', 'Tus respuestas se han enviado correctamente.');
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
