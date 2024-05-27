import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.page.html',
  styleUrls: ['./preguntas-seguridad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntasSeguridadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
