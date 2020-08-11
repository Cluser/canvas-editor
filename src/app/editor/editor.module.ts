import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditorCanvasComponent } from './editor-canvas/editor-canvas.component';
import { EditorMenuTopComponent } from './editor-menu-top/editor-menu-top.component';


@NgModule({
  declarations: [
    EditorComponent,
    EditorCanvasComponent,
    EditorMenuTopComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
