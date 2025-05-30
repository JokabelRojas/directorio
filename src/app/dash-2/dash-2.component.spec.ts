import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dash2Component } from './dash-2.component';

describe('Dash2Component', () => {
  let component: Dash2Component;
  let fixture: ComponentFixture<Dash2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dash2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dash2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
