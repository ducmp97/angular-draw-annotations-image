import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawAnnotationComponent } from './draw-annotation/draw-annotation.component';
import { CreateAnnotationComponent } from './create-annotation/create-annotation.component';
import { ShowAnnotationComponent } from './show-annotation/show-annotation.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DrawAnnotationComponent,
    CreateAnnotationComponent,
    ShowAnnotationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
