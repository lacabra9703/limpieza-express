import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud/crud.component';
import { MainComponent } from './main/main.component';

NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      CommonModule,
      CrudComponent
    ],
    bootstrap: [AppComponent]
  })

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'crud', component: CrudComponent }
    
];
