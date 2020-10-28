export default class Complex {
  constructor(public re: number, public im = 0) {}

  add(other: Complex) {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  multiply(other: Complex) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re,
    );
  }

  divide(other: Complex) {
    const numerator = this.multiply(new Complex(other.re, -other.im));
    const denominator = other.re ** 2 + other.im ** 2;
    return new Complex(numerator.re / denominator, numerator.im / denominator);
  }
}
