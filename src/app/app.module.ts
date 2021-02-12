import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicComponent } from './basic/basic.component';
import { ColdObservablesComponent } from './cold-observables/cold-observables.component';
import { HotObservableIntroComponent } from './hot-observable-intro/hot-observable-intro.component';
import { HotObservablesComponent } from './hot-observables/hot-observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectChildComponent } from './subjects/subject-child/subject-child.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColdObservablesComponent,
    HotObservableIntroComponent,
    HotObservablesComponent,
    SubjectsComponent,
    SubjectChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
