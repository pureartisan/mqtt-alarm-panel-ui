import React, { RefObject } from 'react';

import './style.scss';

type ColorMode = 'dark' | 'light';

interface NoiseGeneratorProps {
  mode?: ColorMode
}

interface NoiseGeneratorState {
  noiseImage?: string;
  noisePosition?: string;
}

class NoiseGenerator extends React.Component<NoiseGeneratorProps, NoiseGeneratorState> {

  static defaultProps: NoiseGeneratorProps = {
    mode: 'light'
  };

  state: NoiseGeneratorState = {};

  private mounted = false;
  private noiseGeneratorTimeout: any = 0;
  private canvasRef: RefObject<any>;

  constructor(props: NoiseGeneratorProps) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
    this.generateNoise();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div
        className={`NoiseGenerator mode-${this.props.mode}`}
        style={{
          backgroundPosition: this.state.noisePosition,
          backgroundImage: this.state.noiseImage
        }}
      >
        <canvas ref={this.canvasRef} width="120" height="120" />
      </div>
    );
  }

  private generateNoise(): void {

    // clear previous timeout
    if (this.noiseGeneratorTimeout) {
      clearInterval(this.noiseGeneratorTimeout);
    }

    if (!this.mounted) {
      return;
    }

    this.noiseGeneratorTimeout = setTimeout(() => {
      if (!this.mounted) {
        return;
      }
      const noiseImage = this.buildNoiseImage();
      const noisePosition = this.getRandomPosition();
      this.setState({
        noiseImage,
        noisePosition
      });
      this.generateNoise();
    }, 1);
  }

  private buildNoiseImage(): string | undefined {
    const canvas = this.canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    for (let x=0; x<width; x++) {
      for (let y=0; y<height; y++) {
        this.fillRandomPixel(ctx, x, y);
      }
    }

    return `url(${canvas.toDataURL()})`;
  }

  private fillRandomPixel(ctx: any, x: number, y: number): void {
    ctx.fillStyle = `rgb(${this.getRandomNumber(255)},${this.getRandomNumber(255)},${this.getRandomNumber(255)})`;
    ctx.fillRect(x, y, 1, 1);
  }

  private getRandomPosition(): string {
    return `${this.getRandomNumber(100)}% ${this.getRandomNumber(100)}%`;
  }

  private getRandomNumber(max: number): number {
    return Math.round(Math.random() * max);
  }

}

export { NoiseGenerator };
