import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorCanvasComponent } from './editor-canvas/editor-canvas.component';


@NgModule({
  declarations: [EditorCanvasComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
