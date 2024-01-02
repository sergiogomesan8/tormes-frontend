import { Component, EventEmitter, Input, Output } from '@angular/core';

const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

@Component({
  selector: 'file-upload-component',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() label: string = '';
  @Output() fileSelected: EventEmitter<{ file?: File; error?: string }> =
    new EventEmitter<{ file?: File; error?: string }>();

  @Input() previewUrl: string | ArrayBuffer =
    'assets/images/icons/upload-file.png';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (!validTypes.includes(file.type)) {
        this.fileSelected.emit({ error: 'Invalid file type' });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (
          typeof reader.result === 'string' ||
          reader.result instanceof ArrayBuffer
        ) {
          this.previewUrl = reader.result;
          this.fileSelected.emit({ file });
        }
      };
      reader.onerror = () => {
        this.fileSelected.emit({
          error: 'An error occurred while reading the file',
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.fileSelected.emit({ error: 'No file selected' });
    }
  }
}
