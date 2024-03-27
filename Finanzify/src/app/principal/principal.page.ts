import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTabs, IonThumbnail, IonTitle, IonToolbar, IonicSafeString,IonButton, IonButtons, IonFab, IonFabButton, IonFabList, IonFooter, IonItemDivider, IonTextarea, IonGrid, IonCol, IonRow, IonMenu, IonMenuButton, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard.page';
import { ContabilidadPage } from '../contabilidad/contabilidad.page';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  // para android imports: [IonicModule, CommonModule, FormsModule, RouterModule,IonMenu,IonMenuButton, IonTabBar,IonTabButton,IonGrid,IonCol,IonRow,RouterLink,IonHeader,IonThumbnail, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList] //IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PrincipalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
