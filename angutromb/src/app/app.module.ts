import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { StudentComponent } from './student-list/student-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AngularMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from './age.pipe';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StudentComponent,
    StudentListComponent,
    AgePipe,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents :[StudentComponent]
})
export class AppModule { }
