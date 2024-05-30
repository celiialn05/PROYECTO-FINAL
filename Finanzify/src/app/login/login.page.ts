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
import { UserService } from '../services/UserService';


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
  constructor(private themeService: ThemeService,private http:HttpClient, private router: Router , private loadingCtrl: LoadingController, private UserService: UserService) {} 
 
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
  async entrar() {
    await this.showLoading(); // Mostrar el loading
  
    const datos = {
      dni: this.dni,
      contrasena: this.contrasena
    };
    
    // Realizar la solicitud GET al servidor para validar las credenciales
    this.http.get<any>('http://192.168.1.247/login.php', { params: datos })
      .subscribe(
        respuesta => {
          this.loadingCtrl.dismiss(); // Ocultar el loading después de recibir la respuesta
          if (respuesta.valido) {
            // Si las credenciales son válidas, navegar a la página principal
            const usuario = {
              dni: this.dni
            };
            this.router.navigate(['/principal'], { state: { usuario } });
            this.UserService.setUsuario(usuario);
            console.log('Usuario page principal:', usuario);

          } else {
            // Si las credenciales son incorrectas, mostrar mensaje de error
            this.error = true;
            console.error('Credenciales incorrectas:', respuesta.mensaje);
            this.setOpen(true);
          }
        },
        error => {
          // En caso de error, ocultar el loading y mostrar mensaje de error
          this.loadingCtrl.dismiss();
          console.error('Error al validar credenciales:', error);
          this.setOpen(true);
        }
      );
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Iniciando sesión...',
      translucent: true,
    });
  
    await loading.present();
  }
  

}
