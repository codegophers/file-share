import { Component, OnInit, Input } from '@angular/core';

import { File } from '../models';
import {UserService} from '../user.service';
import {FilesService} from '../files.service';

@Component({
  selector: '[app-file]',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input('app-file') file: File;
  constructor(private user: UserService, private fs: FilesService) { }

  ngOnInit() {
  }

  remove() {
    this.fs.remove(this.file);
  }

}
