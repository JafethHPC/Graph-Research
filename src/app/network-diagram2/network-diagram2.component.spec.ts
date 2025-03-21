import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDiagram2Component } from './network-diagram2.component';

describe('NetworkDiagram2Component', () => {
  let component: NetworkDiagram2Component;
  let fixture: ComponentFixture<NetworkDiagram2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkDiagram2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkDiagram2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
