import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TormesLibraryComponent } from './tormes-library.component';

describe('TormesLibraryComponent', () => {
  let component: TormesLibraryComponent;
  let fixture: ComponentFixture<TormesLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TormesLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TormesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
