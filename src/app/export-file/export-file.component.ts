import { Component } from '@angular/core';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css'],
})
export class ExportFileComponent {
  downloadJson() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/data.json');
    link.setAttribute('download', 'data.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
    console.log(link.href);
  }

  downloadXml() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/data.xml');
    link.setAttribute('download', 'data.xml');
    document.body.appendChild(link);
    link.click();
    link.remove();
    console.log(link.href);
  }
}
