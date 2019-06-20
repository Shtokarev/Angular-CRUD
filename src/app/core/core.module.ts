import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { ApiService, ApiInterceptor } from '@app/core/services';
import { appReducers } from '@app/core/store/reducers';
import { ProductEffects } from '@app/core/store/effects';
import { environment } from '../../environments/environment';

const provide = [
  ApiService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }
];

const imports = [
  CommonModule,
  HttpClientModule,
  StoreModule.forRoot(appReducers),
  EffectsModule.forRoot([ProductEffects])
  // !environment.production ? StoreDevtoolsModule.instrument() : []
];

@NgModule({
  declarations: [],
  imports: [imports],
  providers: [provide]
})
export class CoreModule {}
