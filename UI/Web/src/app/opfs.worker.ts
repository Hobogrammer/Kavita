/// <reference lib="webworker" />

const FOLDER_NAME = "kavita";

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

class Opfs {
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

  public async saveFileSync(filename: string, extension: string, file: Blob) {
    const fileHandle: FileSystemFileHandle = await this.opfsRoot.getFileHandle(filename + '.' + extension, {create: true});
    const syncAccessHandle = await fileHandle.createSyncAccessHandle();
    syncAccessHandle.write(await file.arrayBuffer(), {at: 0})
    syncAccessHandle.flush();
    syncAccessHandle.close();
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


