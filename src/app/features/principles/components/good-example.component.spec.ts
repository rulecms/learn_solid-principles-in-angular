import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodExampleComponent } from './good-example.component';

describe('GoodExampleComponent', () => {
  let component: GoodExampleComponent;
  let fixture: ComponentFixture<GoodExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
