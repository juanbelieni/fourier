import CircumferenceData from './circumference-data';
import Complex from './complex';

export default function dft(points: Complex[]): CircumferenceData[] {
  const circumferencesData: CircumferenceData[] = [];
  const N = points.length;

  for (let k = 0; k < N; k++) {
    let sum = new Complex(0);

    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      const z = new Complex(Math.cos(phi), -Math.sin(phi));
      sum = sum.add(z.multiply(points[n]));
    }

    sum = sum.divide(new Complex(N));

    const frequency = k;
    const radius = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
    const initialAngle = (Math.atan2(sum.im, sum.re) * 180) / Math.PI;
    circumferencesData.push({ frequency, radius, initialAngle });
  }

  return circumferencesData;
}
