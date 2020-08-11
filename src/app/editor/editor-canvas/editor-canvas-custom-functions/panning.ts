import { fabric } from 'fabric';

export function initPanning(canvas: fabric.Canvas): void {

  canvas.on('mouse:down', function(mouse: any): void {
    const e = mouse.e;
    if (e.altKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });

  canvas.on('mouse:move', function(mouse: any): void {
    if (this.isDragging) {
      const e = mouse.e;
      this.viewportTransform[4] += e.clientX - this.lastPosX;
      this.viewportTransform[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });

  canvas.on('mouse:up', function(mouse: any): void {
    this.isDragging = false;
    this.selection = true;
  });
}
