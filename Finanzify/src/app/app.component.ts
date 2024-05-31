import { Component, NgModule } from '@angular/core';
import { IonApp, IonRouterOutlet, IonicSlides } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicStorageModule } from '@ionic/storage-angular';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  constructor() {}
}
