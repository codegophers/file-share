import { Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private fs: FilesService, private fs_: FeedsService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.fs_.selectedID.do(_ => {
      this.resetState();
      this.resetFileInput();
      this.markForChange();
    });
  }

  markForChange() {
    this.cdr.detectChanges();
  }

  getFile() {
    return this.fileInput.nativeElement.files[0];
  }

  resetFileInput() {
    this.fileInput.nativeElement.value = '';
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
      this.subscription = this.fs.addFile(this.getFile())
        .finally(() => this.resetFileInput())
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
