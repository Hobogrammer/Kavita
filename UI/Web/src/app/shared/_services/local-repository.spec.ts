import {fakeAsync, TestBed} from '@angular/core/testing';
import {LocalRepositoryService} from './local-repository.service'
import {
  CONFIG_TOKEN,
  DBConfig,
  INDEXED_DB,
  NgxIndexedDBModule,
  NgxIndexedDBService,
  provideIndexedDb
} from "ngx-indexed-db";
import {IDBFactory} from "fake-indexeddb";
import {delay, first, of} from "rxjs";
import { TestScheduler } from 'rxjs/testing';

const dbConfig: DBConfig = {
  name: 'kavita-indexedDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'library',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        {
          name: 'id',
          keypath: 'id',
          options: { unique: true }
        },
        {
          name: 'name',
          keypath: 'name',
          options: { unique: false }
        },
        {
          name: 'type',
          keypath: 'type',
          options: { unique: false }
        },
        {
          name: 'folders',
          keypath: 'folders',
          options: { unique: false }
        },
        {
          name: 'coverImage',
          keypath: 'coverImage',
          options: { unique: false }
        },
        { name: 'includeInDashboard',
          keypath: 'includeInDashboard',
          options: { unique: false }
        },
        { name: 'includeInRecommendation',
          keypath: 'includeInRecommendation',
          options: { unique: false }
        },
        { name: 'includeInSearch',
          keypath: 'includeInSearch',
          options: { unique: false }
        },
        { name: 'manageCollections',
          keypath: 'manageCollections',
          options: { unique: false }
        },
        { name: 'manageReadingLists',
          keypath: 'manageReadingLists',
          options: { unique: false }
        },
        { name: 'allowScrobbling',
          keypath: 'allowScrobbling',
          options: { unique: false }
        },
        { name: 'allowMetadataMatching',
          keypath: 'allowMetadataMatching',
          options: { unique: false }
        },
        { name: 'enableMetadata',
          keypath: 'enableMetadata',
          options: { unique: false }
        },
        { name: 'removePrefixForSortName',
          keypath: 'removePrefixForSortName',
          options: { unique: false }
        },
        { name: 'collapseSeriesRelationships',
          keypath: 'collapseSeriesRelationships',
          options: { unique: false }
        },
        { name: 'libraryFileTypes',
          keypath: 'libraryFileTypes',
          options: { unique: false }
        },
        { name: 'excludePatterns',
          keypath: 'excludePatterns',
          options: { unique: false }
        }
      ],
    }
  ]
}

export const DB_CONFIGS: Record<string, DBConfig> = {
  default: dbConfig,
  KavitaIndexedDb: dbConfig
};

describe('LocalRepositoryService',() => {
  let testScheduler : TestScheduler;
  let localRepo: LocalRepositoryService;
  const fakeFactory: IDBFactory = new IDBFactory();

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalRepositoryService
      ],
    }).overrideProvider(CONFIG_TOKEN, { useValue: DB_CONFIGS })
      .overrideProvider(INDEXED_DB, {useValue: fakeFactory})
      .overrideProvider(NgxIndexedDBService, {useValue: new NgxIndexedDBService(DB_CONFIGS, fakeFactory)})
      .compileComponents();

    localRepo = TestBed.inject(LocalRepositoryService);

    testScheduler = new TestScheduler((actual, expected) => {
        return expect(actual).toBe(expected);
    });
  }));

  it('should be created', () => {
    expect(localRepo).toBeInstanceOf(LocalRepositoryService);
  });

  it('should add a library', () => {
    localRepo.add('libray',
      {
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
        "folders": ["F:\\kavita_test\\english"],
        "collapseSeriesRelationships": false,
        "libraryFileTypes": [2],
        "excludePatterns": [""],
        "allowMetadataMatching": false,
        "enableMetadata": true,
        "removePrefixForSortName": false
      });
    const expectedMarbles = '-a';
    testScheduler.run(({ expectObservable }) => {
      expectObservable(localRepo.getAll('library')).toBe(
        expectedMarbles,
        [{id : 3}]
      );
    });
  });
});

