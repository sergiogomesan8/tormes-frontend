import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'file-upload-component',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() label: string = '';
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  previewUrl: string | ArrayBuffer = 'assets/images/icons/upload-file.png';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log(this.previewUrl);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (
          typeof reader.result === 'string' ||
          reader.result instanceof ArrayBuffer
        ) {
          this.previewUrl = reader.result;
          this.fileSelected.emit(file); // Pasa el archivo como argumento aquí
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
