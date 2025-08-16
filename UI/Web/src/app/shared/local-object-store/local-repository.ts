import { Injectable } from '@angular/core';
import Dexie, {type Table} from 'dexie';
import { Chapter } from 'src/app/_models/chapter';
import {FileTypeGroup} from 'src/app/_models/library/file-type-group.enum';
import {Library, LibraryType} from 'src/app/_models/library/library';
import {MangaFormat} from 'src/app/_models/manga-format';
import {AgeRating} from 'src/app/_models/metadata/age-rating';
import {Genre} from 'src/app/_models/metadata/genre';
import {Person} from 'src/app/_models/metadata/person';
import {PublicationStatus} from 'src/app/_models/metadata/publication-status';
import {SeriesMetadata} from 'src/app/_models/metadata/series-metadata';
import {Series} from 'src/app/_models/series';
import {SeriesDetail} from 'src/app/_models/series-detail/series-detail';
import {Tag} from 'src/app/_models/tag';
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

export class SeriesDetailImpl implements SeriesDetail {
    'seriesId': number;
    'specials': Chapter[];
    'chapters': Chapter[];
    'volumes': Volume[];
    'storylineChapters': Chapter[];
    'unreadCount': number;
    'totalCount': number;
}

export class SeriesMetadataImpl implements SeriesMetadata {
    'seriesId': number;
    'summary': string;
    'totalCount': number;
    'maxCount': number;
    'genres': Genre[];
    'tags': Tag[];
    'writers': Person[];
    'coverArtists': Person[];
    'publishers': Person[];
    'characters': Person[];
    'pencillers': Person[];
    'inkers': Person[];
    'imprints': Person[];
    'colorists': Person[];
    'letterers': Person[];
    'editors': Person[];
    'translators': Person[];
    'teams': Person[];
    'locations': Person[];
    'ageRating': AgeRating;
    'releaseYear': number;
    'language': string;
    'publicationStatus': PublicationStatus;
    'webLinks': string;
    'summaryLocked': boolean;
    'genresLocked': boolean;
    'tagsLocked': boolean;
    'writerLocked': boolean;
    'coverArtistLocked': boolean;
    'publisherLocked': boolean;
    'characterLocked': boolean;
    'pencillerLocked': boolean;
    'inkerLocked': boolean;
    'imprintLocked': boolean;
    'coloristLocked': boolean;
    'lettererLocked': boolean;
    'editorLocked': boolean;
    'translatorLocked': boolean;
    'teamLocked': boolean;
    'locationLocked': boolean;
    'ageRatingLocked': boolean;
    'releaseYearLocked': boolean;
    'languageLocked': boolean;
    'publicationStatusLocked': boolean;
}
@Injectable({
  providedIn: 'root'
})
export default class LocalRepository extends Dexie {
  libraries!: Table<Library, number>;
  series!: Table<Series, number>;
  seriesDetail!: Table<SeriesDetail, number>;
  seriesMetadata!: Table<SeriesMetadata, number>;

  constructor() {
    super('KavitaLocal');
    this.version(1).stores({
      libraries: 'id, name',
      series: 'id, name',
      seriesDetails: 'seriesId',
      seriesMetadata: 'seriesId'
    });
    this.libraries.mapToClass(LibraryImpl);
    this.series.mapToClass(SeriesImpl);
    this.seriesDetail.mapToClass(SeriesDetailImpl);
    this.seriesMetadata.mapToClass(SeriesMetadataImpl);
  }
}
