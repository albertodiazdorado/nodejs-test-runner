import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "build/main.js",
	output: {
		file: "dist/main.cjs",
		format: "cjs",
		sourcemap: true,
	},
	plugins: [commonjs(), nodeResolve(), json()],
};
