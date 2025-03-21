import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
  ],
}).catch((err) => console.error(err));
