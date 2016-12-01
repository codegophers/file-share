import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import {Subscription} from 'rxjs';


import { FilesService } from '../files.service';
import { FeedsService } from '../feeds.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css'],
})
export class NewFileComponent implements OnInit {
  kind: null | string = null;
  value: null | number = null;
  subscription: null | Subscription = null;


  @ViewChild('fileInput') fileInput;
  @ViewChild('commentInput') commentInput;

  constructor(private fs: FilesService, private fs_: FeedsService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.fs_.selectedID.do(_ => {
      this.resetState();
      this.resetForm();
      this.markForChange();
    });
  }

  markForChange() {
    this.cdr.detectChanges();
  }

  getFile() {
    return this.fileInput.nativeElement.files[0];
  }

  getComment() {
    return this.commentInput.nativeElement.value;
  }

  resetForm() {
    this.fileInput.nativeElement.value = '';
    this.commentInput.nativeElement.value = '';
  }

  resetState() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
    this.kind = null;
    this.value = null;
  }

  onClick() {
    if (this.getFile()) {
      this.subscription = this.fs.addFile(this.getFile(), this.getComment())
        .finally(() => this.resetForm())
        .materialize()
        .subscribe(
          ({value, kind}) => {
            this.value = value;
            this.kind = kind;
            this.markForChange();
          }
        );
    }
  }

}
