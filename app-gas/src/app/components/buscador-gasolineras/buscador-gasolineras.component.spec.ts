import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorGasolinerasComponent } from './buscador-gasolineras.component';

describe('BuscadorGasolinerasComponent', () => {
  let component: BuscadorGasolinerasComponent;
  let fixture: ComponentFixture<BuscadorGasolinerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorGasolinerasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorGasolinerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
