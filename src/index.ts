import { complex, Complex } from 'mathjs';

import dft from './dft';
import FourierSeries from './fourier-series';

const drawing: Complex[] = [];
let isDrawing = false;

function createPoint(event: MouseEvent) {
  if (isDrawing) {
    drawing.push(
      complex(
        event.x - window.innerWidth / 2,
        event.y - window.innerHeight / 2,
      ),
    );
  }
}

document.addEventListener('mousedown', () => (isDrawing = true));
document.addEventListener('mouseup', () => (isDrawing = false));
document.addEventListener('mousemove', createPoint);

const fourierSeries = new FourierSeries();

function draw() {
  fourierSeries.step();
  requestAnimationFrame(draw);
}

document.addEventListener('keypress', (event: KeyboardEvent) => {
  if (event.key === ' ') {
    const circumferencesData = dft(drawing);
    fourierSeries.createCircumferences(circumferencesData);

    draw();
  }
});
