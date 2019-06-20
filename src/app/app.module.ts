import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InputProductComponent } from './input-product/input-product.component';

@NgModule({
  declarations: [AppComponent, InputProductComponent],
  imports: [BrowserModule, CoreModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
