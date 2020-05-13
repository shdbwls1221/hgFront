import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsMetricComponent } from './os-metric.component';

describe('OsMetricComponent', () => {
  let component: OsMetricComponent;
  let fixture: ComponentFixture<OsMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
