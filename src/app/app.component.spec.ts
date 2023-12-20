import { fas } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { far } from '@fortawesome/free-regular-svg-icons';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockTranslateService: any;
  let mockFaIconLibrary: any;

  beforeEach(() => {
    mockTranslateService = { setDefaultLang: jest.fn() };
    mockFaIconLibrary = { addIconPacks: jest.fn() };
    component = new AppComponent(mockTranslateService, mockFaIconLibrary);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to es', () => {
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith('es');
  });

  it('should add icon packs', () => {
    expect(mockFaIconLibrary.addIconPacks).toHaveBeenCalledWith(fas, far);
  });
});
