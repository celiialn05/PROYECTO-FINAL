import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntasSeguridadPage } from './preguntas-seguridad.page';

describe('PreguntasSeguridadPage', () => {
  let component: PreguntasSeguridadPage;
  let fixture: ComponentFixture<PreguntasSeguridadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
