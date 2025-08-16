import "fake-indexeddb/auto";
import {MockService} from 'ng-mocks';
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
      const mockLibrary = MockService(LibraryImpl, {
        id: 3
      });

      localRepo.addLibary(mockLibrary).then(() => {
        localRepo.getLibraryById(mockLibrary.id).then((result) => {
          expect(result).toEqual(mockLibrary);
        });
      });
    }) ;
  });

  describe('Series', () => {
    it('should add series to local repository', () => {
      const mockSeries = MockService(SeriesImpl, {
        id: 866
      });

      localRepo.addSeries(mockSeries).then(() => {
        localRepo.getSeriesById(mockSeries.id).then((result) => {
          expect(result).toEqual(mockSeries);
        });
      });
    });
  });

  describe('SeriesDetail', () => {
    it('should add series detail to local repository', () => {
      const mockSeriesDetail = MockService(SeriesDetailImpl, {
        seriesId: 866
      });

      localRepo.addSeriesDetail(mockSeriesDetail).then(() => {
        localRepo.getSeriesDetailBySeriesId(mockSeriesDetail.seriesId).then((result) => {
          expect(result).toEqual(mockSeriesDetail);
        })
      })
    })
  });

  describe('SeriesMetadata', () => {
   it('should add series metadata to local repository', () => {
     const mockSeriesMetadata = MockService(SeriesMetadataImpl, {
       seriesId: 866
     });

     localRepo.addSeriesMetadata(mockSeriesMetadata).then(() => {
       localRepo.getSeriesMetadataBySeriesId(mockSeriesMetadata.seriesId).then((result) => {
         expect(result).toEqual(mockSeriesMetadata);
       })
     })
   })
  });
});

