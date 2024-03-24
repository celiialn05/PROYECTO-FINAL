import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTabs, IonTitle, IonToolbar, IonicSafeString } from '@ionic/angular/standalone';
import { IonButton, IonButtons, IonFab, IonFabButton, IonFabList, IonFooter, IonItemDivider, IonTextarea, IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard.page';
import { ContabilidadPage } from '../contabilidad/contabilidad.page';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink] //IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList
})
export class PrincipalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
