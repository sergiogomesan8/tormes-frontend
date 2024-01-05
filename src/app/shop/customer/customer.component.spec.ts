/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@shop/models/user.model';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let authServiceMock: jest.Mocked<AuthenticationService>;

  beforeEach(async () => {
    authServiceMock = {
      getUserInfo: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userInfo and isLoggedIn correctly on ngOnInit', () => {
    const user: User = {
      id: 'id',
      name: 'Test User',
      email: 'test@mail.com',
    };
    authServiceMock.getUserInfo.mockReturnValue(user);

    component.ngOnInit();

    expect(component.userInfo).toEqual(user);
    expect(component.isLoggedIn).toBe(true);
  });
});
