import { Config } from 'bili'
const fs = require('fs-extra')

fs.removeSync('dist')
fs.ensureDirSync('dist');
fs.copySync('package.json', 'dist/package.json')

const config: Config = {
    plugins: {
        typescript2: {
            // Override the config in `tsconfig.json`
            tsconfigOverride: {
                include: ['src'],
            }
        }
    },
    // Let's take this opportunity to move the CLI flags here as well
    input: 'index.ts',
    babel: {
        minimal: true,
    },
    output: {
        fileName: 'index.js',//it was: 'index.[format].js'
        moduleName: '@lab1/core',
        format: ['esm-min'],//it was: esm
        sourceMap:false
    }
}

export default config
