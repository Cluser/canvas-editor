import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './editor-canvas.component.html',
  styleUrls: ['./editor-canvas.component.scss']
})
export class EditorCanvasComponent implements OnInit {

  private canvas: fabric.Canvas;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.registerListeners();
  }

  private initCanvas(): void {
    this.canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const canvasParent = document.getElementById('editor-canvas-section');
    this.canvasWidth = canvasParent.offsetWidth;
    this.canvasHeight = canvasParent.offsetHeight;
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }

  private registerListeners(): void {
    window.addEventListener('resize', () => this.resizeCanvas());
  }

}
