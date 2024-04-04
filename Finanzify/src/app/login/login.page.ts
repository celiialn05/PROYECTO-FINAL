import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { moon, sunnyOutline } from 'ionicons/icons';
import { ThemeService } from '../services/theme.service';
import { IonButton, IonButtons, IonCol, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonItemDivider, IonRow, IonTextarea } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink]
                                                          //Para Android tendras que añadir estos imports (comando para hacer build: ionic capacitor build android )
  //imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList],//,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
})
export class LoginPage implements OnInit {
  dni: string = '';
  contrasena: string = '';
  error: boolean = false;
  isToastOpen = false;
  constructor(private themeService: ThemeService,private http:HttpClient, private router: Router) {} 
 
  ngOnInit() {
  } 
  toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      this.themeService.enableDarkMode(); 
    } else {
      this.themeService.disableDarkMode();  // Llama a la función de ThemeService aquí
    }
  }
  

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  entrar() {
    const datos = {
      dni: this.dni,
      contrasena: this.contrasena
    };

    // Envía los datos al servidor para validar las credenciales
   // Realizar la solicitud GET
  this.http.get<any>('http://localhost/prueba.php', { params: { dni: this.dni, contrasena: this.contrasena } }).subscribe(
  respuesta => {
    if (respuesta.valido) {
      // Credenciales válidas, redirige al usuario a la página principal
      this.router.navigate(['/principal']);
    } else {
      // Credenciales incorrectas, muestra un mensaje de error
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
 

}
