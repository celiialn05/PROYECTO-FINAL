import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCol, IonFab, IonFabButton,AlertController,IonToolbar, IonFabList, IonFooter, IonGrid, IonHeader, IonItemDivider, IonCardHeader,IonRow, IonSpinner,IonTitle, IonCard,IonTextarea,IonCardTitle,IonBadge,IonContent,IonList,IonItem,IonInput,IonSelect, LoadingController } from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/UserService';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
  standalone: true,
   //imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink,  ReactiveFormsModule]
  imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonBadge,IonList,IonItem,IonInput,IonSelect]
})
export class CambiarContrasenaPage implements OnInit {
  nuevaContrasena!: string;
  repetirContrasena!: string;
  usuario: any;

  constructor(
     private http: HttpClient,
     private userService: UserService, 
     private alertController: AlertController, 
     private router: Router
    ) {}

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
  }

  async cambiarContrasena() {
    if (this.nuevaContrasena !== this.repetirContrasena) {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Las contraseñas no coinciden.',
            buttons: ['OK']
        });
        await alert.present();
        return;
    }

    const datos = new URLSearchParams();
    datos.set('dni', this.userService.getUsuario().dni);
    datos.set('contrasena', this.nuevaContrasena);

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };
/*
    Petición POST para cambiar la contraseña del usuario
*/
    this.http.post('https://finanzify.sytes.net/cambiar_contrasena.php', datos.toString(), httpOptions)
        .subscribe(response => {
            this.router.navigate(['/login']);
        }, error => {
            console.error(error);
        });
}
}