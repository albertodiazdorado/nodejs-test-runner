import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "main.ts",
	output: {
		file: "dist/main.js",
		format: "esm",
		sourcemap: true,
	},
	plugins: [typescript(), commonjs(), json(), nodeResolve()],
};
