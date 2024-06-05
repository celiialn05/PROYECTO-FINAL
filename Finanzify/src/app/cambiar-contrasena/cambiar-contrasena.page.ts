import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { moon, sunnyOutline } from 'ionicons/icons';
import { ThemeService } from '../services/theme.service';
import { IonButton, IonButtons, IonCol, IonFab, IonFabButton,AlertController,IonToolbar, IonFabList, IonFooter, IonGrid, IonHeader, IonItemDivider, IonCardHeader,IonRow, IonSpinner,IonTitle, IonCard,IonTextarea,IonCardTitle,IonBadge,IonContent,IonList,IonItem,IonInput,IonSelect, LoadingController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/UserService';
import { StorageService } from '../services/StorageService';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink,  ReactiveFormsModule]
  //imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonBadge,IonList,IonItem,IonInput,IonSelect]
})
export class CambiarContrasenaPage implements OnInit {
  nuevaContrasena!: string;
  repetirContrasena!: string;
  usuario: any;

  constructor(private http: HttpClient, private userService: UserService, private alertController: AlertController) {}

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

    const datos = {
      dni: this.usuario.dni,
      contrasena: this.nuevaContrasena
    };

    this.http.post('http://192.168.1.247/cambiar_contrasena.php', datos)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}