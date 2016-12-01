import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

import { File } from '../models';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';
import {FilesService} from '../files.service';

@Component({
  selector: '[app-file]',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  canLikeFile = false;
  admin: boolean;

  @Input('app-file') file: File;
  constructor(private user: UserService, private fs: FilesService, private auth: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.user.admin.first().subscribe(admin => {
      this.admin = admin;
      this.updateCanLikeFile();
    });
  }

  updateCanLikeFile() {
    this.canLikeFile = this.admin || !this.auth.hasLikedFile(this.file.id);
    this.cdr.detectChanges();
  }
  remove() {
    this.fs.remove(this.file);
  }

  like() {
    this.fs.like(this.file);
    this.auth.likeFile(this.file.id);
    this.updateCanLikeFile();
  }
}
