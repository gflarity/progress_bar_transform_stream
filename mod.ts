import ProgressBar from "https://deno.land/x/progress@v1.3.8/mod.ts";

export interface ProgressBarOptions {
  title?: string;
  total?: number;
  width?: number;
  complete?: string;
  preciseBar?: string[];
  incomplete?: string;
  clear?: boolean;
  interval?: number;
  display?: string;
  prettyTime?: boolean;
}

export interface Lengthable {
  length: number;
}

export class ProgressBarTransformStream<
  T extends Lengthable
> extends TransformStream {
  private progressBar: ProgressBar;
  private progress = 0;
  constructor(progressBarOptions: ProgressBarOptions) {
    super({
      transform: (chunk: T, controller) => {
        this.progressBar.render((this.progress += chunk.length));
        controller.enqueue(chunk);
      },
    });
    this.progressBar = new ProgressBar(progressBarOptions);
  }
}

export default ProgressBarTransformStream;
