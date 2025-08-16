import "fake-indexeddb/auto";
import {fakeAsync, TestBed} from '@angular/core/testing';
import {LocalRepositoryService} from './local-repository.service'
import { LibraryImpl, SeriesDetailImpl, SeriesImpl, SeriesMetadataImpl } from "../local-object-store/local-repository";

describe('LocalRepositoryService',() => {
  let localRepo: LocalRepositoryService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalRepositoryService
      ],
    }).compileComponents();

    localRepo = TestBed.inject(LocalRepositoryService);
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
    it('should add series to local repository', () => {
      const expectedSeries = {} as SeriesImpl;
      localRepo.addSeries(expectedSeries).then(() => {
        localRepo.getSeriesById(expectedSeries.id).then((result) => {
          expect(result).toEqual(expectedSeries);
        });
      });
    });
  });

  describe('SeriesDetail', () => {
    it('should add series detail to local repository', () => {
      const expectedSeriesDetail = {} as SeriesDetailImpl;
      localRepo.addSeriesDetail(expectedSeriesDetail).then(() => {
        localRepo.getSeriesDetailBySeriesId(expectedSeriesDetail.seriesId).then((result) => {
          expect(result).toEqual(expectedSeriesDetail);
        })
      })
    })
  });

  describe('SeriesMetadata', () => {
   it('should add series metadata to local repository', () => {
     const expectedSeriesMetadata = {} as SeriesMetadataImpl;
     localRepo.addSeriesMetadata(expectedSeriesMetadata).then(() => {
       localRepo.getSeriesMetadataBySeriesId(expectedSeriesMetadata.seriesId).then((result) => {
         expect(result).toEqual(expectedSeriesMetadata);
       })
     })
   })
  });
});

