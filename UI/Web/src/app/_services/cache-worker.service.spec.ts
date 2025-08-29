import { MockService } from "ng-mocks";
import { CacheWorkerService } from "./cache-worker.service";
import path from "path";

describe('CacheWorkerService', () => {
  let cacheWorkerService: CacheWorkerService;

  beforeEach(() => {
    cacheWorkerService = new CacheWorkerService();
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
