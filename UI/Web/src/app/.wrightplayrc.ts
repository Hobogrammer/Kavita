import type {ConfigOptions} from 'wrightplay/node';


export const config: ConfigOptions = {
  entryPoints: {
    worker: "./workers/cache.worker.ts"
  },
  tests: './test/**.test.*',
}
