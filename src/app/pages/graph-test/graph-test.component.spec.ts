import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTestComponent } from './graph-test.component';

describe('GraphTestComponent', () => {
  let component: GraphTestComponent;
  let fixture: ComponentFixture<GraphTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
