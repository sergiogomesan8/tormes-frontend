/* tslint:disable:no-unused-variable */
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;

  beforeEach(() => {
    component = new FileUploadComponent();
    component.fileSelected = {
      emit: jest.fn(),
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit fileSelected event when onFileSelected is called with a file', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };

    const reader = {
      readAsDataURL: jest.fn(),
      result: 'result',
      onload: jest.fn(),
    };

    window.FileReader = jest.fn(() => reader) as any;

    component.onFileSelected(mockEvt);

    if (typeof reader.onload === 'function') {
      reader.onload();
    }

    expect(component.fileSelected.emit).toHaveBeenCalledWith(mockFile);
    expect(component.previewUrl).toEqual(reader.result);
  });
});
