const { cp } = require("fs/promises");
const esbuild = require("esbuild");
const esbuildHtmlMinify = require("esbuild-plugin-html-minify");

esbuild
  .build({
    entryPoints: ["src/index.html", "src/index.ts", "src/styles.css"],
    bundle: true,
    minify: true,
    outdir: "build",
    plugins: [esbuildHtmlMinify()]
  })
  .then(() => cp("src/assets", "build/assets", { recursive: true }));
