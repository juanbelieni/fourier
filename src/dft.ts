import {
  add,
  cos,
  sin,
  complex,
  Complex,
  pi,
  multiply,
  sqrt,
  atan2,
  divide,
} from 'mathjs';

import CircumferenceData from './circumference-data';

export default function dft(points: Complex[]): CircumferenceData[] {
  const circumferencesData: CircumferenceData[] = [];
  const N = points.length;

  for (let k = 0; k < N; k++) {
    let sum = complex(0, 0);

    for (let n = 0; n < N; n++) {
      const phi = (2 * pi * k * n) / N;
      const z = complex(cos(phi), -sin(phi));

      sum = add(sum, multiply(points[n], z)) as Complex;
    }

    sum = divide(sum, N) as Complex;

    const frequency = k;
    const radius = sqrt(sum.re * sum.re + sum.im * sum.im);
    const initialAngle = (atan2(sum.im, sum.re) * 180) / pi;
    circumferencesData.push({ frequency, radius, initialAngle });
  }

  return circumferencesData;
}
