/// <reference lib="webworker" />
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CacheWorkerService {
  private worker: Worker;

  constructor() {
    //this.worker = inject(CacheWorker);
    this.worker = new Worker('cache-worker.js'); //TODO: Can we somehow create a WebWorkerFactory or provider? This would allow for Dependency Injection
  }

  cacheFile(file: File, fileId: string, libraryId: string, seriesId: string) {
    const init = {
      data: {
        "file": JSON.stringify(file),
        "libraryId": libraryId,
        "seriesId": seriesId
      }
    };
    const cacheFileRequest = new ExtendableMessageEvent('cacheFile', init);
    this.worker.postMessage(cacheFileRequest);
  }

  deleteFile() {
  }

  deleteFolder() {
  }

  clearCache() {
  }

  terminate() {
    this.worker.terminate();
  }
}
