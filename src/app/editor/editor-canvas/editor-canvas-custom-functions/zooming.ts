import { fabric } from 'fabric';

export function initZooming(canvas: fabric.Canvas): void {

  canvas.on('mouse:wheel', (mouse: any) => {
    const point = new fabric.Point(mouse.e.offsetX, mouse.e.offsetY);
    const delta = mouse.e.deltaY;
    const zoom = canvas.getZoom() - delta / 2000;
    const zoomMin = 0.01;
    const zoomMax = 20;

    if (zoom < zoomMax && zoom > zoomMin) { canvas.zoomToPoint(point, zoom); }
  });
}
