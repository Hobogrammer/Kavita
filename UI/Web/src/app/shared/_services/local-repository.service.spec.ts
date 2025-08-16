import "fake-indexeddb/auto";
import {fakeAsync, TestBed} from '@angular/core/testing';
import {LocalRepositoryService} from './local-repository.service'
import {delay, first, of} from "rxjs";
import { TestScheduler } from 'rxjs/testing';
import { LibraryImpl } from "../local-object-store/local-repository";

describe('LocalRepositoryService',() => {
  let testScheduler : TestScheduler;
  let localRepo: LocalRepositoryService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalRepositoryService
      ],
    }).compileComponents();

    localRepo = TestBed.inject(LocalRepositoryService);

    testScheduler = new TestScheduler((actual, expected) => {
        return expect(actual).toBe(expected);
    });
  }));

  it('should be created', () => {
    expect(localRepo).toBeInstanceOf(LocalRepositoryService);
  });

  describe('Libraries', () => {
    it('should add libraries', () => {
      const expectedLibrary = {
        "id": 3,
        "name": "epub_en_offline_test",
        "lastScanned": "2025-07-30T17:42:43.9125949",
        "type": 2,
        "coverImage": null,
        "folderWatching": true,
        "includeInDashboard": true,
        "includeInRecommended": true,
        "manageCollections": false,
        "manageReadingLists": false,
        "includeInSearch": true,
        "allowScrobbling": false,
        "folders": [
        "F:\\kavita_test\\english"
      ],
        "collapseSeriesRelationships": false,
        "libraryFileTypes": [
        2
      ],
        "excludePatterns": [
        ""
      ],
        "allowMetadataMatching": false,
        "enableMetadata": true,
        "removePrefixForSortName": false
    } as LibraryImpl;

      localRepo.addLibary(expectedLibrary).then(() => {
        localRepo.getAllLibraries().then((result) => {
          expect(result).toEqual(expectedLibrary);
        });
      });
    }) ;
  });

  describe('Series', () => {

  })
});

