import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadExampleComponent } from './bad-example.component';

describe('BadExampleComponent', () => {
  let component: BadExampleComponent;
  let fixture: ComponentFixture<BadExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
