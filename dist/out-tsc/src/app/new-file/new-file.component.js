var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FilesService } from '../files.service';
import { FeedsService } from '../feeds.service';
var NewFileComponent = (function () {
    function NewFileComponent(fs, fs_, cdr) {
        this.fs = fs;
        this.fs_ = fs_;
        this.cdr = cdr;
        this.kind = null;
        this.value = null;
        this.subscription = null;
    }
    NewFileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fs_.selectedID.do(function (_) {
            _this.resetState();
            _this.resetForm();
            _this.markForChange();
        });
    };
    NewFileComponent.prototype.markForChange = function () {
        this.cdr.detectChanges();
    };
    NewFileComponent.prototype.getFile = function () {
        return this.fileInput.nativeElement.files[0];
    };
    NewFileComponent.prototype.getComment = function () {
        return this.commentInput.nativeElement.value;
    };
    NewFileComponent.prototype.resetForm = function () {
        this.fileInput.nativeElement.value = '';
        this.commentInput.nativeElement.value = '';
    };
    NewFileComponent.prototype.resetState = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = null;
        this.kind = null;
        this.value = null;
    };
    NewFileComponent.prototype.onClick = function () {
        var _this = this;
        if (this.getFile()) {
            this.subscription = this.fs.addFile(this.getFile(), this.getComment())
                .finally(function () { return _this.resetForm(); })
                .materialize()
                .subscribe(function (_a) {
                var value = _a.value, kind = _a.kind;
                _this.value = value;
                _this.kind = kind;
                _this.markForChange();
            });
        }
    };
    return NewFileComponent;
}());
__decorate([
    ViewChild('fileInput'),
    __metadata("design:type", Object)
], NewFileComponent.prototype, "fileInput", void 0);
__decorate([
    ViewChild('commentInput'),
    __metadata("design:type", Object)
], NewFileComponent.prototype, "commentInput", void 0);
NewFileComponent = __decorate([
    Component({
        selector: 'app-new-file',
        templateUrl: './new-file.component.html',
        styleUrls: ['./new-file.component.css'],
    }),
    __metadata("design:paramtypes", [FilesService, FeedsService, ChangeDetectorRef])
], NewFileComponent);
export { NewFileComponent };
//# sourceMappingURL=../../../../../src/app/new-file/new-file.component.js.map