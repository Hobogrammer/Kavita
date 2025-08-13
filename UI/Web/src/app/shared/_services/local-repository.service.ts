import {DBConfig, NgxIndexedDBService} from "ngx-indexed-db";
import {inject, Injectable} from "@angular/core";
export const dbConfig: DBConfig = {
  name: 'kavita-indexdb',
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

@Injectable({
  providedIn: 'root'
})
export class LocalRepositoryService {
  static dbConfig: DBConfig;
  private dbService: NgxIndexedDBService = inject(NgxIndexedDBService);

  constructor(private indexedDBService: NgxIndexedDBService) {
    this.dbService = indexedDBService;

    this.dbService.createObjectStore(dbConfig.objectStoresMeta[0]);
    this.dbService.add('library',  {
      "id": 399,
      "name": "epub_en_offline_test6666",
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
      "folders": ["F:\\kavita_test\\angrsih"],
      "collapseSeriesRelationships": false,
      "libraryFileTypes": [2],
      "excludePatterns": [""],
      "allowMetadataMatching": false,
      "enableMetadata": true,
      "removePrefixForSortName": false
    });
  }

  public add(storeName: string, value: any) {
    return this.dbService.add(storeName, value);
  }

  public delete() {

  }

  public getById() {

  }

  public update() {

  }

  public getAll(storeName: string) {
    console.log('Getting all values for storeName: ', storeName);
    const result  = this.dbService.getAll('library');
    return result
  }
}
