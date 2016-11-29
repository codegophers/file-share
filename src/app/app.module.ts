import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedsComponent } from './feeds/feeds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './feed/feed.component';
import { FilesComponent } from './files/files.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { FeedsService } from './feeds.service';
import { FilesService } from './files.service';
import { FileComponent } from './file/file.component';
import { NewFileComponent } from './new-file/new-file.component';
import { UserService } from './user.service';
import firebaseConfig from './firebaseConfig';


const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedsComponent,
    DashboardComponent,
    FeedComponent,
    NewFeedComponent,
    FilesComponent,
    FileComponent,
    NewFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    FeedsService,
    FilesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
