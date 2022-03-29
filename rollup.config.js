import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2'
import pkg from '@lab1/examples/package.json'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.ts',
	output: [
	  {
		file: pkg.main,
		format: 'cjs',
	  },
	  {
		file: pkg.module,
		format: 'es',
	  },
	],
	external: [
	  ...Object.keys(pkg.dependencies || {}),
	  ...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		typescript({ typescript: require('typescript'), exclude:['src/Page*.ts']}),
		production && terser() // minify, but only in production
	]
};
