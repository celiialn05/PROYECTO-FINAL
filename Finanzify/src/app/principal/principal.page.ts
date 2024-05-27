import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTabs, IonThumbnail, IonTitle, IonToolbar, IonicSafeString,IonButton, IonButtons, IonFab, IonFabButton, IonFabList, IonFooter, IonItemDivider, IonTextarea, IonGrid, IonCol, IonRow, IonMenu, IonMenuButton, IonTabBar, IonTabButton, ModalController, IonModal } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard.page';
import { ContabilidadPage } from '../contabilidad/contabilidad.page';
import { SharedMobileModule } from '../shared/shared-mobile.module';
import { Platform } from '@ionic/angular';
import { SharedWebModule } from '../shared/shared-web.module';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  //imports: [IonicModule, CommonModule, FormsModule, RouterModule,IonMenu,IonMenuButton, IonTabBar,IonTabButton,IonGrid,IonCol,IonRow,RouterLink,IonHeader,IonThumbnail, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonModal] //IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PrincipalPage implements OnInit {
  showModal: boolean = false;
  constructor(private modalController: ModalController,private themeService: ThemeService) { }
 
  
  ngOnInit() {
  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
  async openImageModal() {
    this.showModal = true;
  }

  async closeImageModal() {
    this.showModal = false;
  }
}
