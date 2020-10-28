import createStage from './create-stage';
import dft from './dft';
import Drawing from './drawing';
import FourierSeries from './fourier-series';

const stage = createStage();
const drawing = new Drawing(stage);
const fourierSeries = new FourierSeries(stage);
let animationFrame: number;

function update() {
  fourierSeries.step();
  animationFrame = requestAnimationFrame(update);
}

document.addEventListener('keypress', (event: KeyboardEvent) => {
  if (event.key === ' ') {
    cancelAnimationFrame(animationFrame);
    const circumferencesData = dft(drawing.points);
    drawing.cleanDrawing();
    fourierSeries.cleanStage();
    fourierSeries.createCircumferences(circumferencesData);
    update();
  }
});

document.addEventListener('mousedown', () => {
  fourierSeries.cleanStage();
});
