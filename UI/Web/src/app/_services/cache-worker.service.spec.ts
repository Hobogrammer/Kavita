import {MockInstance, MockService } from "ng-mocks";
import { CacheWorkerService } from "./cache-worker.service";
import { TestBed } from "@angular/core/testing";
describe('CacheWorkerService', () => {
  let cacheWorkerService: CacheWorkerService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CacheWorkerService,
      ],
    }).overrideProvider(globalThis.Worker, { useValue: mockWorker})
      .compileComponents();

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
