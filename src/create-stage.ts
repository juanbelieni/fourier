import Konva from 'konva';

export default function createStage() {
  const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const backgroundLayer = new Konva.Layer();
  stage.add(backgroundLayer);

  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: '#444',
  });

  backgroundLayer.add(background);
  backgroundLayer.draw();

  return stage;
}
