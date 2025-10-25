import { FileTypeGroup } from "../../src/app/_models/library/file-type-group.enum";
import { Library, LibraryType } from "../../src/app/_models/library/library";
import { LibraryFactory } from "./library-factory";
import { Series } from "../../src/app/_models/series";
import { SeriesFactory } from "./series-factory";
import { MangaFormat } from "../../src/app/_models/manga-format";
import { SeriesMetadata } from "../../src/app/_models/metadata/series-metadata";
import { PublicationStatus } from "../../src/app/_models/metadata/publication-status";
import { AgeRating } from "../../src/app/_models/metadata/age-rating";
import { SeriesDetail } from "../../src/app/_models/series-detail/series-detail";
import { Volume } from "../../src/app/_models/volume";

describe('SeriesFactory', () => {
  let folders: Array<string>;
  let fileTypes: Array<FileTypeGroup>;
  let library: Library;

  beforeEach(() => {
     folders = ["/books"];
     fileTypes = [FileTypeGroup.Epub];
     library = LibraryFactory.create("test", LibraryType.Book, fileTypes, folders);
  });

  describe('create()', () => {
    it('should create a series with no volumes', () => {
      const series: Series = SeriesFactory.create(library, MangaFormat.EPUB);

      expect(series).toBeDefined();
      expect(series.volumes.length).toEqual(0);
      expect(series.name).toBeDefined();
      expect(series.nameLocked).toBe(false);
      expect(series.sortName).toBe(series.name)
      expect(series.sortNameLocked).toBe(false);
      expect(series.localizedName).toBe(series.name)
      expect(series.localizedNameLocked).toBe(false);
      expect(series.coverImage).toBeDefined();
      expect(series.coverImageLocked).toBe(false);
      expect(series.userRating).toEqual(0);
      expect(series.pagesRead).toEqual(0);
      expect(series.wordCount).toBeDefined();
      expect(series.pages).toBeDefined();
      expect(series.minHoursToRead).toEqual(1);
      expect(series.maxHoursToRead).toEqual(999);
      expect(series.avgHoursToRead).toBeDefined();
      expect(series.lastChapterAdded).toBeDefined();
      expect(series.latestReadDate).toBeDefined();
      expect(series.libraryId).toEqual(library.id);
      expect(series.primaryColor).toBeDefined();
      expect(series.secondaryColor).toBeDefined();
      expect(series.publishers.length).toEqual(1);
      expect(series.writers.length).toEqual(1);
      expect(series.isBlacklisted).toBe(false);
      // @ts-ignore
      expect(series.webLinks).toBe("")
      // @ts-ignore
      expect(series.tags).toEqual([]);
      // @ts-ignore
      expect(series.genres).toEqual([]);
      expect(series.coverArtists).toEqual([]);
      expect(series.characters).toEqual([]);
      expect(series.pencillers).toEqual([]);
      expect(series.imprints).toEqual([]);
      expect(series.inkers).toEqual([]);
      expect(series.colorists).toEqual([]);
      expect(series.letterers).toEqual([]);
      expect(series.editors).toEqual([]);
      expect(series.translators).toEqual([]);
      expect(series.teams).toEqual([]);
      expect(series.locations).toEqual([]);
    });
  });

  describe('createSeriesMetadataForSeries()', () => {
    it('should create and return a seriesMetadata object', () => {
      const series: Series = SeriesFactory.create(library, MangaFormat.EPUB);
      const seriesMetadata: SeriesMetadata = SeriesFactory.createSeriesMetadataForSeries(series);

      expect(seriesMetadata).toBeDefined();
      expect(seriesMetadata.seriesId).toEqual(series.id);
      expect(seriesMetadata.summary).toBeDefined();
      expect(seriesMetadata.summaryLocked).toBe(false);
      expect(seriesMetadata.writers).toEqual(series.writers);
      expect(seriesMetadata.writerLocked).toBe(false);
      expect(seriesMetadata.publishers).toEqual(series.publishers);
      expect(seriesMetadata.publisherLocked).toBe(false);
      expect(seriesMetadata.tags).toEqual([])
      expect(seriesMetadata.tagsLocked).toBe(false);
      expect(seriesMetadata.genres).toEqual([]);
      expect(seriesMetadata.genresLocked).toBe(false);
      expect(seriesMetadata.coverArtists).toEqual(series.coverArtists);
      expect(seriesMetadata.coverArtistLocked).toBe(false);
      expect(seriesMetadata.inkers).toEqual(series.inkers);
      expect(seriesMetadata.inkerLocked).toBe(false);
      expect(seriesMetadata.characters).toEqual(series.characters);
      expect(seriesMetadata.characterLocked).toBe(false);
      expect(seriesMetadata.pencillers).toEqual(series.pencillers);
      expect(seriesMetadata.pencillerLocked).toBe(false);
      expect(seriesMetadata.imprints).toEqual(series.imprints);
      expect(seriesMetadata.imprintLocked).toBe(false);
      expect(seriesMetadata.colorists).toEqual(series.colorists);
      expect(seriesMetadata.coloristLocked).toBe(false);
      expect(seriesMetadata.letterers).toEqual(series.letterers);
      expect(seriesMetadata.lettererLocked).toBe(false);
      expect(seriesMetadata.editors).toEqual(series.editors);
      expect(seriesMetadata.editorLocked).toBe(false);
      expect(seriesMetadata.translators).toEqual(series.translators)
      expect(seriesMetadata.translatorLocked).toBe(false);
      expect(seriesMetadata.teams).toEqual(series.teams);
      expect(seriesMetadata.teamLocked).toBe(false);
      expect(seriesMetadata.locations).toEqual(series.locations);
      expect(seriesMetadata.locationLocked).toBe(false);
      expect(seriesMetadata.language).toBeDefined();
      expect(seriesMetadata.languageLocked).toBe(false);
      expect(seriesMetadata.publicationStatus).toEqual(PublicationStatus.Completed);
      expect(seriesMetadata.publicationStatusLocked).toBe(false);
      expect(seriesMetadata.releaseYear).toBeDefined();
      expect(seriesMetadata.releaseYearLocked).toBe(false);
      expect(seriesMetadata.ageRating).toBe(AgeRating.Everyone);
      expect(seriesMetadata.webLinks).toEqual("");
      expect(seriesMetadata.maxCount).toEqual(1);
      expect(seriesMetadata.totalCount).toEqual(0);
    });
  });

  describe('createVolumesForSeries()', () => {
    it('should create the correct number of volumes', () => {
      const series: Series = SeriesFactory.create(library, MangaFormat.EPUB);
      const expectedVolumeCount = 3;
      const volumes: Array<Volume> = SeriesFactory.createVolumesForSeries(series, expectedVolumeCount);

      expect(volumes).toBeDefined();
      expect(volumes.length).toEqual(expectedVolumeCount);
      volumes.forEach(volume => {
        expect(volume.chapters.length).toEqual(1);
        // TODO: Fill the rest of this out
      });
    });
  });

  describe('createSeriesDetailForSeries()', () => {
    it('should create and return a seriesDetail for series', () => {
      let series: Series = SeriesFactory.create(library, MangaFormat.EPUB);
      series.volumes = SeriesFactory.createVolumesForSeries(series);
      const seriesDetail: SeriesDetail = SeriesFactory.createSeriesDetailForSeries(series);

      expect(seriesDetail).toBeDefined();
      expect(seriesDetail.specials).toEqual([]);
      expect(seriesDetail.chapters).toEqual([]);
      expect(seriesDetail.volumes).toEqual(series.volumes);
      expect(seriesDetail.storylineChapters).toEqual([]);
      expect(seriesDetail.totalCount).toEqual(series.volumes.length);
      expect(seriesDetail.unreadCount).toEqual(series.volumes.length);
      // expect(seriesDetail.publishers).toEqual(series.publishers);
    });
  })
});
