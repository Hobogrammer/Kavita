/// <reference lib="webworker" />

const FOLDER_NAME = "kavita";

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

class OpfsWorker {
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

  public async saveFileSync(filename: string, extension: string) {
    let fileHandle: FileSystemFileHandle;
    const syncAccessHandle = await this.opfsRoot.getFileHandle(filename + '.' + extension, {create: true});
  }
}


