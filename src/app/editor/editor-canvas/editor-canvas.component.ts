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
  private workGround: fabric.Rect;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.registerListeners();
  }

  private initCanvas(): void {
    this.canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
    this.resizeCanvas();
    this.prepareWorkGround();
  }

  private resizeCanvas(): void {
    const canvasParent = document.getElementById('editor-canvas-section');
    this.canvasWidth = canvasParent.offsetWidth;
    this.canvasHeight = canvasParent.offsetHeight;
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
    this.prepareWorkGround();
  }

  private registerListeners(): void {
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private prepareWorkGround(): void {
    this.workGround = new fabric.Rect({ left: 0, width: 1920, height: 1080, fill: 'white'});
    // @ts-ignore
    this.canvas.setBackgroundImage(this.workGround);
    this.scaleWorkGround();
    this.setViewportCenter();
  }

  private scaleWorkGround(): void {
    const widthHigher = this.workGround.width > this.canvasWidth;
    const heightHigher = this.workGround.height > this.canvasHeight;

    if (widthHigher) {
      this.canvas.setZoom((this.canvasWidth / this.workGround.width) - 0.05);
    }

    if (heightHigher && !widthHigher) {
      this.canvas.setZoom((this.canvasHeight / this.workGround.height) - 0.05);
    }
  }

  private setViewportCenter(): void {
    const horizontalZoom = this.canvas.getZoom();
    const verticalZoom = this.canvas.getZoom();
    const horizontalOffset = (this.canvasWidth - (this.workGround.width * horizontalZoom)) / 2;
    const verticalOffset = (this.canvasHeight - (this.workGround.height * verticalZoom)) / 2;

    this.canvas.viewportTransform = [horizontalZoom, 0, 0, verticalZoom, horizontalOffset, verticalOffset];
  }

}
