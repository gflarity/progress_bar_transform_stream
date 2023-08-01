# Example - wget

```TypeScript
import { ProgressBarTransformStream } from "https://deno.land/x/progress_bar_transform_stream@v1.0.0/mod.ts";

const url = Deno.args[0];
const splitUrl = url.split("/");
const fileName = splitUrl[splitUrl.length - 1];
const response = await fetch(url);
const contentLength = parseInt(response.headers.get("content-length")!);
const out = await Deno.open("./" + fileName, { write: true, create: true });
response.body
  ?.pipeThrough(
    new ProgressBarTransformStream({ total: contentLength, title: fileName })
  )
  .pipeTo(out.writable);
  .pipeTo(out.writable);
```
