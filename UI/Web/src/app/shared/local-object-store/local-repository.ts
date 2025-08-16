import { Injectable } from '@angular/core';
import Dexie, {type Table} from 'dexie';
import { FileTypeGroup } from 'src/app/_models/library/file-type-group.enum';
import {Library, LibraryType} from 'src/app/_models/library/library';
import { MangaFormat } from 'src/app/_models/manga-format';
import {Series} from 'src/app/_models/series';
import {Volume} from 'src/app/_models/volume';

export class LibraryImpl implements Library {
  'id': number;
  'name': string;
  'lastScanned': string;
  'type': LibraryType;
  'folders': string[];
  'coverImage'?: string | null | undefined;
  'folderWatching': boolean;
  'includeInDashboard': boolean;
  'includeInRecommended': boolean;
  'includeInSearch': boolean;
  'manageCollections': boolean;
  'manageReadingLists': boolean;
  'allowScrobbling': boolean;
  'allowMetadataMatching': boolean;
  'enableMetadata': boolean;
  'removePrefixForSortName': boolean;
  'collapseSeriesRelationships': boolean;
  'libraryFileTypes': FileTypeGroup[];
  'excludePatterns': string[];
}

export class SeriesImpl implements Series {
    'id': number;
    'name': string;
    'originalName': string;
    'localizedName': string;
    'sortName': string;
    'coverImageLocked': boolean;
    'sortNameLocked': boolean;
    'localizedNameLocked': boolean;
    'nameLocked': boolean;
    'volumes': Volume[];
    'pages': number;
    'pagesRead': number;
    'userRating': number;
    'hasUserRated': boolean;
    'libraryId': number;
    'created': string;
    'format': MangaFormat;
    'latestReadDate': string;
    'lastChapterAdded': string;
    'lastFolderScanned': string;
    'wordCount': number;
    'minHoursToRead': number;
    'maxHoursToRead': number;
    'avgHoursToRead': number;
    'folderPath': string;
    'lowestFolderPath': string;
    'summary?': string | undefined;
    'coverImage'?: string | undefined;
    'primaryColor': string;
    'secondaryColor': string;
    'dontMatch': boolean;
    'isBlacklisted': boolean;
}
@Injectable({
  providedIn: 'root'
})
export default class LocalRepository extends Dexie {
  libraries!: Table<Library, number>;
  series!: Table<Series, number>;

  constructor() {
    super('KavitaLocal');
    this.version(1).stores({
      libraries: 'id, name',
      series: 'id, name'
    });
    this.libraries.mapToClass(LibraryImpl);
    this.series.mapToClass(SeriesImpl);
  }
}
