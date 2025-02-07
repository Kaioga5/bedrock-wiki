import { createMarkdownRenderer } from "vitepress";

const config = globalThis.VITEPRESS_CONFIG;

export default await createMarkdownRenderer(
  config.srcDir,
  config.markdown,
  config.site.base,
  config.logger
);
