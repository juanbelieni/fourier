import Konva from 'konva';

import Complex from './complex';

export default class Drawing {
  private readonly shapeLayer: Konva.Layer;
  private isDrawing = false;
  private shape: Konva.Line;
  points: Complex[] = [];

  constructor(private readonly stage: Konva.Stage) {
    document.addEventListener('mousedown', () => (this.isDrawing = true));
    document.addEventListener('mouseup', () => (this.isDrawing = false));
    document.addEventListener('mousemove', (e) => this.createPoint(e));

    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);
    this.createShape();
  }

  private createShape() {
    this.shape = new Konva.Line({
      points: [],
      stroke: 'white',
      strokeWidth: 1,
    });

    this.shapeLayer.add(this.shape);
  }

  cleanDrawing() {
    this.points = [];
    this.shape.points([]);
  }

  private createPoint(event: MouseEvent) {
    if (this.isDrawing) {
      const { x, y } = event;
      this.points.push(
        new Complex(x - window.innerWidth / 2, y - window.innerHeight / 2),
      );
      this.shape.points([...this.shape.points(), x, y]);
      this.shapeLayer.draw();
    }
  }
}
