import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-edit/shopping-list.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    AuthComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
