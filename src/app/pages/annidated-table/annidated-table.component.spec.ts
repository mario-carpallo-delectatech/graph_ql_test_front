import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnidatedTableComponent } from './annidated-table.component';

describe('AnnidatedTableComponent', () => {
  let component: AnnidatedTableComponent;
  let fixture: ComponentFixture<AnnidatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnidatedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnidatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
