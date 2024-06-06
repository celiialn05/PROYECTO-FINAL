import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgClass } from '@angular/common';
import { IonButton, IonButtons, AlertController, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
import { IonicModule } from '@ionic/angular';
import { Pregunta } from '../preguntas-seguridad/pregunta.model';

interface RespuestaServidor {
  resultado: boolean;
  mensaje: string;
}


@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.page.html',
  styleUrls: ['./recuperar-cuenta.page.scss'],
  standalone: true,
 // imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink]
  imports: [IonicModule, CommonModule, FormsModule,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]

})
export class RecuperarCuentaPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router , 
    private UserService: UserService) { }

  preguntas: Pregunta[] = [];
  respuestas: { [key: string]: string } = {}; 
  dni: string = '';
  correo: string = '';
  ngOnInit() {
    this.getPreguntasSeguridad();
  }

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

  comprobarRespuestas() {
    if (!this.dni || !this.correo) {
      this.presentAlert('Advertencia', 'Por favor, complete tanto el DNI como el correo electrónico.');
      return;
    }
  
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    const datos = new URLSearchParams();
    datos.set('dni', this.dni);
    datos.set('email', this.correo);

    // Asumiendo que this.respuestas es un objeto con las respuestas
    Object.entries(this.respuestas).forEach(([key, value]) => {
      datos.append('respuestas[]', value);
    });
  
    this.http.post<any>('https://finanzify.sytes.net/validar_respuestas.php', datos.toString(), { headers }).subscribe(
      data => {
        if (data.resultado) {
          this.presentAlert('Resultado', data.mensaje);
          const usuario = {
            dni: this.dni
          };
          this.UserService.setUsuario(usuario);
          this.router.navigate(['/cambiar-contrasena']);
        } else {
          this.presentAlert('Resultado', 'Algunos datos no coinciden');
        }
      },
      error => {
        console.error('Error al comprobar respuestas:', error);
        this.presentAlert('Error', 'Hubo un error al comprobar las respuestas. Por favor, inténtalo de nuevo más tarde.');
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

