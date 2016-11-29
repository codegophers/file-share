import { Component } from '@angular/core';

import { FilesService } from '../files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent {
  constructor(private fs: FilesService) {}

}
