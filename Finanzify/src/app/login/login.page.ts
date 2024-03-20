import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { moon, sunnyOutline } from 'ionicons/icons';
import { ThemeService } from '../services/theme.service';
import { IonButton, IonButtons, IonFab, IonFabButton, IonFabList, IonFooter, IonHeader, IonItemDivider, IonTextarea } from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,                                                          //Para Android tendras que añadir estos imports 
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink],//,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
})
export class LoginPage implements OnInit {
  constructor(private themeService: ThemeService) {} 
 
  ngOnInit() {
  } 
  toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      this.themeService.enableDarkMode(); 
    } else {
      this.themeService.disableDarkMode();  // Llama a la función de ThemeService aquí
    }
  }
  



}
