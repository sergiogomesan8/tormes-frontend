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

  it('should emit fileSelected event with file when onFileSelected is called with a valid file', () => {
    const mockFile = new File([''], 'filename', { type: 'image/png' });
    const mockEvt = { target: { files: [mockFile] } };

    const reader = {
      readAsDataURL: jest.fn(),
      result: 'result',
      onload: jest.fn(),
      onerror: jest.fn(),
    };

    window.FileReader = jest.fn(() => reader) as any;

    component.onFileSelected(mockEvt);

    if (typeof reader.onload === 'function') {
      reader.onload();
    }

    expect(component.fileSelected.emit).toHaveBeenCalledWith({
      file: mockFile,
    });
    expect(component.previewUrl).toEqual(reader.result);
  });

  it('should emit fileSelected event with error when onFileSelected is called with an invalid file', () => {
    const mockFile = new File([''], 'filename', { type: 'invalid/type' });
    const mockEvt = { target: { files: [mockFile] } };

    component.onFileSelected(mockEvt);

    expect(component.fileSelected.emit).toHaveBeenCalledWith({
      error: 'Invalid file type',
    });
  });

  it('should emit fileSelected event with error when onFileSelected is called with no file', () => {
    const mockEvt = { target: { files: [] } };

    component.onFileSelected(mockEvt);

    expect(component.fileSelected.emit).toHaveBeenCalledWith({
      error: 'No file selected',
    });
  });
});
