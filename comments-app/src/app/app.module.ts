import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { CommentFormComponent } from 'src/app/components/comment-form/comment-form.component';
import { InMemoryDataService } from 'src/app/services/in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: /*environment.production*/false })/*,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
