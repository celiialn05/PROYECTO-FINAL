import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent,IonThumbnail ,IonFooter, IonHeader,IonMenu,IonMenuButton,IonTabButton ,IonTabBar,IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { UserService } from '../services/UserService';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { ThemeService } from '../services/theme.service';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
 //imports: [IonicModule, CommonModule, FormsModule, RouterModule,IonMenu,IonMenuButton, IonTabBar,IonTabButton,IonGrid,IonCol,IonRow,RouterLink,IonHeader,IonThumbnail, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList] //IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList]
})
export class PrincipalPage implements OnInit {
  usuario: any;
 
  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private http: HttpClient,
    private sanitizer: DomSanitizer ,) {}

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
 
}
