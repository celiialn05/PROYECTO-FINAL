import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Método público para activar el modo oscuro
  enableDarkMode() {
    this.document.documentElement.classList.add('dark-theme');
    this.document.documentElement.classList.remove('light-theme');
  }

  // Método público para desactivar el modo oscuro
  disableDarkMode() {
    this.document.documentElement.classList.remove('dark-theme');
    this.document.documentElement.classList.add('light-theme');
  }
  toggleDarkMode() {
    if (this.document.documentElement.classList.contains('dark-theme')) {
      this.disableDarkMode(); 
    } else {
      this.enableDarkMode(); 
    }
  }
}
