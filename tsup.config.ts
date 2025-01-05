import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    dts: true,
    format: ["esm", "cjs"],
    outExtension({ format }) {
        return {
            js: `.js`,
            mjs: `.mjs`,
            cjs: `.cjs`,
        };
    },
});
