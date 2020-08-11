import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './editor-canvas.component.html',
  styleUrls: ['./editor-canvas.component.scss']
})
export class EditorCanvasComponent implements OnInit {

  private canvas: fabric.Canvas;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    this.canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
  }

}
