/// <reference lib="webworker" />
const cacheWorkerFactory = new globalThis.Worker('/src/app/workers/cacheWorker.ts')

export const cacheWorkerProvider = {
  provide: globalThis.Worker,
  useFactory: cacheWorkerFactory
};
