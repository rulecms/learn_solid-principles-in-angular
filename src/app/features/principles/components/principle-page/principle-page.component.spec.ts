import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinciplePageComponent } from './principle-page.component';

describe('PrinciplePageComponent', () => {
  let component: PrinciplePageComponent;
  let fixture: ComponentFixture<PrinciplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinciplePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinciplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
