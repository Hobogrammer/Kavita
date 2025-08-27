import {DOCUMENT} from "@angular/common";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class DocumentWindow {
  private readonly document = inject(DOCUMENT);
  private readonly window;

  constructor() {
    this.document = document;
    this.window = this.document.defaultView;
  }

  getStorageManagerAsync():Promise<FileSystemDirectoryHandle> | undefined {
    return this.window?.navigator.storage.getDirectory();
  }
}
