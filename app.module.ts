import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeofenceComponent } from './geofence/geofence.component';
import { MapComponent } from './geofence/map/map.component';
import { FormComponent } from './geofence/form/form.component';
import { MapService } from './shared/map.service';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import { HeaderComponent } from './geofence/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GeofenceComponent,
    MapComponent,
    FormComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDyk8Y9LFXMieqJw_4MRlqLl85eSVbSfqw',
      libraries: ['drawing']
    })
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
