import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  constructor(private http: HttpClient) {}
  fileName = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const newFileName = 'data.txt';

      const formData = new FormData();

      formData.append('file', file, newFileName);

      const upload$ = this.http.post(
        'https://localhost:7170/api/upload',
        formData
      );

      upload$.subscribe();

      AppComponent.prototype.getGames();
    }
  }
}
