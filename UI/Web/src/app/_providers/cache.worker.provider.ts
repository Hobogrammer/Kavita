/// <reference lib="webworker" />
const cacheWorkerFactory = new Worker('/src/app/workers/cacheWorker.ts')

export const cacheWorkerProvider = {
  provide: Worker,
  useFactory: cacheWorkerFactory
};
