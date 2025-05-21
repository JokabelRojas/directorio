import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSemestreComponent } from './ver-semestre.component';

describe('VerSemestreComponent', () => {
  let component: VerSemestreComponent;
  let fixture: ComponentFixture<VerSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSemestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
