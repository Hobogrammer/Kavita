/// <reference lib="webworker" />

/*
import { Library } from "./_models/library/library";
import { Series } from "./_models/series";
*/

//const FOLDER_NAME = "kavita";

addEventListener('message', ({ data }: MessageEvent) => {
  const msg = data.message;
  postMessage(handleMessage(msg))
});

async function handleMessage(msg:any) { // adjust this :any later
//  const series:Series = msg.series; For later
//  const library:Library = msg.library; For later
  const file:File = msg.file;

  const opfsRoot = await navigator.storage.getDirectory();

  const fileHandle: FileSystemFileHandle = await opfsRoot.getFileHandle(file.name, {create: true});
  const syncAccessHandle = await fileHandle.createSyncAccessHandle();
  syncAccessHandle.write(await file.arrayBuffer(), {at: 0})
  syncAccessHandle.flush();
  syncAccessHandle.close();
  // return filepath for saved file?
}

class CacheWorker extends Worker {

}
/*
class CacheWorker {
  private opfsRoot!: FileSystemDirectoryHandle;
  private kavitaRoot!: FileSystemDirectoryHandle;

  constructor() {
    navigator.storage.getDirectory().then(result => {
      this.opfsRoot = result;
    });
    this.opfsRoot.getDirectoryHandle(FOLDER_NAME, {create: true}).then(result => {
      this.kavitaRoot = result;
    });
  }

  public async getFile(filename: string): Promise<Blob> {
    const fileHandle: FileSystemFileHandle = await this.opfsRoot.getFileHandle(filename, {create: false});
    const file = await fileHandle.getFile();
    return file;
  }

  public async deleteFile(filename: string) {
    const fileSystemDirectoryHandle: FileSystemDirectoryHandle = await this.opfsRoot.getDirectoryHandle(filename, {create: false});
    const directoryHandle = await fileSystemDirectoryHandle.getDirectoryHandle(filename);
    await directoryHandle.removeEntry(filename);
  }
}
*/


