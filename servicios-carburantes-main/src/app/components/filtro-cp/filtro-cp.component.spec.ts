import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCpComponent } from './filtro-cp.component';

describe('FiltroCpComponent', () => {
  let component: FiltroCpComponent;
  let fixture: ComponentFixture<FiltroCpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
