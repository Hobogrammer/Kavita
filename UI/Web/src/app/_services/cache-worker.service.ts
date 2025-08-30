/// <reference lib="webworker" />
import {inject, Injectable } from "@angular/core";

@Injectable()
export class CacheWorkerService {
  private worker: Worker;

  constructor() {
    this.worker = inject(Worker);

    // Check if worker is defined, else throw a Kavita Exception or something
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
