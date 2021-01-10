import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { DocumentComponent }  from './document.component';
import { DocumentService } from './document.service';

@NgModule({
  imports: [     
      BrowserModule,
      HttpModule,
      ReactiveFormsModule
  ],
  declarations: [
      AppComponent,
      DocumentComponent
  ],
  providers: [
      DocumentService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
