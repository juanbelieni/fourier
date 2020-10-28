import Konva from 'konva';

import CircumferenceData from './circumference-data';

export interface Circumference extends CircumferenceData {
  circle: Konva.Circle;
  radiusLine: Konva.Line;
}

export default class FourierSeries {
  private readonly circumferencesLayer: Konva.Layer;
  private readonly shapeLayer: Konva.Layer;
  private shape: Konva.Line;
  private circumferences: Circumference[] = [];
  private points: number[] = [];
  private dt = 0.1;
  private time = 0;

  constructor(private readonly stage: Konva.Stage) {
    this.circumferencesLayer = new Konva.Layer();
    this.stage.add(this.circumferencesLayer);

    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);
    this.createShape();
  }

  private createShape() {
    this.shape = new Konva.Line({
      points: [],
      stroke: 'yellow',
      strokeWidth: 2,
    });

    this.shapeLayer.add(this.shape);
  }

  private createCircumference({
    radius,
    frequency,
    initialAngle,
  }: CircumferenceData): void {
    const circle = new Konva.Circle({
      radius,
      stroke: '#fff5',
      strokeWidth: 2,
    });
    this.circumferencesLayer.add(circle);

    const radiusLine = new Konva.Line({
      points: [0, 0, radius, 0],
      stroke: 'white',
      width: 2,
    });
    this.circumferencesLayer.add(radiusLine);

    const circumference: Circumference = {
      circle,
      radiusLine,
      radius,
      frequency,
      initialAngle,
    };

    this.circumferences.push(circumference);
    this.dt = 360 / this.circumferences.length;
  }

  createCircumferences(circumferencesData: CircumferenceData[]) {
    circumferencesData
      .sort((a, b) => b.radius - a.radius)
      .forEach((data) => this.createCircumference(data));
  }

  drawCircumferences(): Konva.Vector2d {
    let x = this.circumferencesLayer.width() / 2;
    let y = this.circumferencesLayer.height() / 2;

    for (const circumference of this.circumferences) {
      const {
        circle,
        radiusLine,
        initialAngle,
        frequency,
        radius,
      } = circumference;

      const rotation = initialAngle + this.time * frequency;

      circle.position({ x, y });
      radiusLine.position({ x, y });
      radiusLine.rotation(rotation);

      const radRotation = (rotation * Math.PI) / 180;
      x += Math.cos(radRotation) * radius;
      y += Math.sin(radRotation) * radius;
    }

    this.time += this.dt;
    this.circumferencesLayer.draw();

    return { x, y };
  }

  drawShape() {
    this.shape.points(this.points);
    this.shapeLayer.draw();
  }

  step() {
    const point = this.drawCircumferences();
    this.points.push(point.x);
    this.points.push(point.y);

    if (this.time > 360) {
      this.points.shift();
      this.points.shift();
    }
    this.drawShape();
  }

  cleanStage() {
    this.circumferencesLayer.removeChildren();
    this.time = 0;
    this.circumferences = [];
    this.points = [];
  }
}
