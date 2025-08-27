import {TestBed} from '@angular/core/testing';
import {OpfsService} from './opfs.service';
import {MockService} from "ng-mocks";
import { DocumentWindow } from '../document-window';

export type FileSystemDirectoryHandle = globalThis.FileSystemDirectoryHandle;
describe('OpfsService', () => {
  let opfsService: OpfsService;
  let fileSystemDirectoryHandleSpy = jest.fn().mockImplementationOnce(() => {

  })
  let fileSystemFileHandleSpy = jest.fn();
  let fileHandleSpy = jest.fn();
  let mockDocWindow: DocumentWindow = MockService(DocumentWindow, {
    getStorageManagerAsync: jest.fn().mockReturnValue(MockService(Promise<FileSystemDirectoryHandle>)).mockReturnValue(fileSystemDirectoryHandleSpy),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       OpfsService
     ]
    }).overrideProvider(DocumentWindow, { useValue: mockDocWindow})
      .compileComponents();

    opfsService = TestBed.inject(OpfsService);
  });

  it('should be created', () => {
    expect(opfsService).toBeInstanceOf(OpfsService);
    expect(mockDocWindow.getStorageManagerAsync).toHaveBeenCalled();
    expect(fileSystemDirectoryHandleSpy.getDirectoryHandle).toHaveBeenCalled();
  });

  it('should save files', () => {
    const mockFile = MockService(File);
    const series = "MockSeries";

    opfsService.saveFileSync(series, mockFile);
    expect(mockDocWindow.getStorageManagerAsync).toHaveBeenCalled();
    expect(fileSystemDirectoryHandleSpy.getDirectoryHandle).toHaveBeenCalled();
  });

  it('should delete files', () => {

  });

  it('should delete empty folders', () => {

  });

  it('should delete folders', () => {

  });

  it('should retrieve files', () => {

  });
});
