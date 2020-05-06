import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

function createConfig({ file, format, minify = false }) {
  const isUmd = format === "umd";
  return {
    input: "src/interserver.ts",
    output: {
      file,
      format,
      ...(isUmd ? { name: "Interserver", exports: "named" } : {}),
    },
    plugins: [resolve(), commonjs(), typescript(), minify && terser()],
  };
}

export default [
  createConfig({ file: pkg.module, format: "es" }),
  createConfig({ file: pkg.main, format: "umd" }),
  createConfig({ file: pkg.unpkg, format: "umd", minify: true }),
];
