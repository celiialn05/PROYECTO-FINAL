import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { moon, sunnyOutline } from 'ionicons/icons';
import { ThemeService } from '../services/theme.service';
import { IonButton, IonButtons, IonCol, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonItemDivider, IonRow, IonSpinner, IonTextarea, LoadingController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink]
                                                          //Para Android tendras que añadir estos imports (comando para hacer build: ionic capacitor build android )
  //imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonSpinner],//,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
})
export class LoginPage implements OnInit {
  dni: string = '';
  contrasena: string = '';
  error: boolean = false;
  isToastOpen = false;
  constructor(private themeService: ThemeService,private http:HttpClient, private router: Router , private loadingCtrl: LoadingController) {} 
 
  ngOnInit() {
  } 
  toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      this.themeService.enableDarkMode(); 
    } else {
      this.themeService.disableDarkMode();
    }
  }
  

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  entrar() {
    this.showLoading()
    const datos = {
      dni: this.dni,
      contrasena: this.contrasena
    };
    

    // Envía los datos al servidor para validar las credenciales
   // Realizar la solicitud GET
  this.http.get<any>('https://192.168.1.247/prueba.php', { params: { dni: this.dni, contrasena: this.contrasena },
}).subscribe(
  respuesta => {
    this.loadingCtrl.dismiss();
    if (respuesta.valido) {
      this.router.navigate(['/principal']);
    } else {
      this.error = true;
      console.error('Credenciales incorrectas:', respuesta.mensaje);
      this.setOpen(true);
      
      
    }
  },
  error => {
    console.error('Error al validar credenciales:', error);
    this.setOpen(true);
    // Manejar el error de manera adecuada
  }
 );

  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Iniciando sesión...',
      translucent: true,
    });

    loading.present();
  }
 

}
