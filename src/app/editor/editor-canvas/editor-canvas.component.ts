import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { initZooming, initPanning } from './editor-canvas-custom-functions';
import { MoveObjectEnum } from './../../shared/enums/move-object-enum';
import { EditorSharedActionService } from '../editor-shared/editor-shared-action.service';

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
  private clipboard: fabric.Object;

  constructor(private editorSharedActionService: EditorSharedActionService) { }

  ngOnInit(): void {
    this.initCanvas();
    this.registerListeners();
    this.initCustomFunctions();
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
    // Browser listeners
    window.addEventListener('resize', () => this.resizeCanvas());

    // Canvas listeners
    this.canvas.on('selection:created', (selection) => this.editorSharedActionService.selectObject.next(selection));
    this.canvas.on('selection:updated', (selection) => this.editorSharedActionService.selectObject.next(selection));
    this.canvas.on('selection:cleared', () => this.editorSharedActionService.selectObject.next());

    // Editor shared action service listeners
    this.editorSharedActionService.addRect.subscribe(() => this.addRect());
    this.editorSharedActionService.addCircle.subscribe(() => this.addCircle());
    this.editorSharedActionService.addTriangle.subscribe(() => this.addTriangle());
    this.editorSharedActionService.addLine.subscribe(() => this.addLine());
    this.editorSharedActionService.addText.subscribe(() => this.addText());


  }

  private initCustomFunctions(): void {
    initZooming(this.canvas);
    initPanning(this.canvas);
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

  public addRect(): void {
    const obj = new fabric.Rect({
      id: 'Rect',
      width: 100,
      height: 100,
      fill: '#2b3950',
      noScaleCache: false
    });
    this.addToCanvas(obj);
  }

  public addCircle(): void {
    const obj = new fabric.Circle({
      id: 'Circle',
      radius: 100,
      fill: '#2b3950',
      noScaleCache: false
    });
    this.addToCanvas(obj);
  }

  public addTriangle(): void {
    const obj = new fabric.Triangle({
      id: 'Triangle',
      width: 100,
      height: 100,
      fill: '#2b3950',
      noScaleCache: false
    });
    this.addToCanvas(obj);
  }

  public addLine(): void {
    const obj = new fabric.Line([50, 100, 200, 100], {
      id: 'Line',
      height: 10,
      stroke: '#2b3950',
      noScaleCache: false
    });
    this.addToCanvas(obj);
  }

  public addText(): void {
    const obj = new fabric.Textbox('Example text', {
      id: 'Text',
      left: 100,
      top: 200,
      width: 200,
      fontSize: 25,
      splitByGrapheme: true,
      lockScalingY: true,
      noScaleCache: false
    });
    this.addToCanvas(obj);
  }


  private addToCanvas(obj: fabric.Object): void {
    this.canvas.add(obj);
    this.canvas.bringToFront(obj);
    this.canvas.viewportCenterObject(obj);
    this.canvas.trigger('object:created');
  }

  public deleteObjects(): void {
    this.canvas.getActiveObjects().forEach(object => {
      this.canvas.remove(object);
    });
  }


  public moveObjects(direction: string): void {
    const step = 1;
    const activeGroup = this.canvas.getActiveObjects();

    if (activeGroup) {
      activeGroup.forEach(object => {
        switch (direction) {
          case MoveObjectEnum.left:
            object.left = object.left - step;
            break;
          case MoveObjectEnum.right:
            object.left = object.left + step;
            break;
          case MoveObjectEnum.up:
            object.top = object.top - step;
            break;
          case MoveObjectEnum.down:
            object.top = object.top + step;
            break;
        }
        object.setCoords();
      });
      this.canvas.renderAll();
    }
  }

  public copyObjects(): void {
    if (this.canvas.getActiveObject() != null) {
      this.canvas.getActiveObject().clone(clonedObject => {
        this.clipboard = clonedObject;
      });
    }
  }

  public pasteObjects(): void {
    if (this.clipboard != null) {
      this.clipboard.clone(clonedObject => {
        this.canvas.discardActiveObject();
        clonedObject.set({
          left: clonedObject.left + 10,
          top: clonedObject.top + 10,
          evented: true,
        });
        if (clonedObject.type === 'activeSelection') {
          clonedObject.canvas = this.canvas;
          clonedObject.forEachObject(object => {
            this.canvas.add(object);
          });
          clonedObject.setCoords();
        } else {
          this.canvas.add(clonedObject);
        }
        this.clipboard.top += 10;
        this.clipboard.left += 10;
        this.canvas.setActiveObject(clonedObject);
        this.canvas.requestRenderAll();
        this.canvas.trigger('object:paste');
      });
    }
  }

  public selectAll(): void {
    this.canvas.setActiveObject(new fabric.ActiveSelection(this.canvas.getObjects()));
    this.canvas.requestRenderAll();
  }

}
