import {MockInstance, MockService } from "ng-mocks";
import { CacheWorkerService } from "./cache-worker.service";
import { TestBed } from "@angular/core/testing";

//Stub for Worker class
class Worker {
  private url: string;
  private onmessage;
 constructor(url: string) {
  this.url = url;
  this.onmessage = (msg: any) => {};
 }

 postMessage(msg: any) {
   this.onmessage(msg);
 }

 cacheFile() {}
}
describe('CacheWorkerService', () => {
  let cacheWorkerService: CacheWorkerService;
  const spyWorker = MockInstance(Worker, 'cacheFile', jest.fn());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Worker, useValue: spyWorker},
        CacheWorkerService,
      ],
    }).compileComponents();

    cacheWorkerService = TestBed.inject(CacheWorkerService);
  });

  it('should send cacheFile message to cache worker', () => {
    const mockFile = MockService(File);
    const fakeFileId = '1';
    const fakeSeriesId = '666';
    const fakeLibaryId = '9001';

    //const newFilePath =
    cacheWorkerService.cacheFile(mockFile, fakeFileId, fakeSeriesId, fakeLibaryId);

    //expect(newFilePath).toBe("kavita/" + fakeLibaryId + "/" + fakeSeriesId + "/" + fakeFileId + path.extname(mockFile))
  })
});
