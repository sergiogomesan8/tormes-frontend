import { Component } from '@angular/core';
import * as LR from '@uploadcare/blocks';

LR.registerBlocks(LR);

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  files: any[] = [];

  handleUploaderEvent(e: Event) {
    const { data: files } = (e as CustomEvent).detail;
    this.files = files;
  }
}
