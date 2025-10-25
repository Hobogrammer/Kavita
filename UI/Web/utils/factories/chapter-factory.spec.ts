import { FileTypeGroup } from "../../src/app/_models/library/file-type-group.enum";
import { LibraryFactory } from "./library-factory";
import { SeriesFactory } from "./series-factory";
import { Series } from "../../src/app/_models/series";
import { MangaFormat } from "../../src/app/_models/manga-format";
import {Library, LibraryType } from "../../src/app/_models/library/library";
import { Chapter } from "../../src/app/_models/chapter";
import { ChapterFactory } from "./chapter-factory";
import { AgeRating } from "../../src/app/_models/metadata/age-rating";
import { PublicationStatus } from "../../src/app/_models/metadata/publication-status";

describe('ChapterFactory', () => {
  it('Should create a chapter', async () => {
    const folders: Array<string> = ["/books"];
    const fileTypes: Array<FileTypeGroup> = [FileTypeGroup.Epub];
    const library: Library = LibraryFactory.create("test", LibraryType.Book, fileTypes, folders);
    const count: number = 1;
    const totalCount: number = 1;
    const volumeId: number = 1;
    const series: Series = SeriesFactory.create(library, MangaFormat.EPUB);

    const chapter: Chapter = ChapterFactory.createChapterForSeries(count, series, totalCount, volumeId);

    expect(chapter).toBeDefined();
    expect(chapter.range).toEqual("-100000");
    expect(chapter.volumeId).toEqual(1);
    expect(chapter.wordCount).toBeDefined();
    expect(chapter.count).toBe(1);
    expect(chapter.totalCount).toBe(1);
    expect(chapter.language).toEqual("en");
    expect(chapter.summary).toBeDefined();
    expect(chapter.ageRating).toEqual(AgeRating.Everyone);
    expect(chapter.publicationStatus).toEqual(PublicationStatus.Completed);
    expect(chapter.files.length).toEqual(1);
    chapter.files.forEach(file => {
      expect(file.id).toBeDefined();
      expect(file.filePath).toEqual(series.folderPath + '/' + series.name + ' - Vol ' + count.toString() + '.epub');
      expect(file.pages).toBeDefined();
      expect(file.created).toBeDefined();
      expect(file.bytes).toBeDefined();
    });
    // @ts-ignore
    expect(chapter.tags).toEqual(series.tags);
    expect(chapter.writers).toEqual(series.writers);
    expect(chapter.publishers).toEqual(series.publishers);
    expect(chapter.characters).toEqual(series.characters);
    expect(chapter.locations).toEqual(series.locations);
    expect(chapter.translators).toEqual(series.translators);
    expect(chapter.coverArtists).toEqual(series.coverArtists);
    expect(chapter.pencillers).toEqual(series.pencillers);
    expect(chapter.inkers).toEqual(series.inkers);
    expect(chapter.imprints).toEqual(series.imprints);
    expect(chapter.teams).toEqual(series.teams);
    expect(chapter.editors).toEqual(series.editors);
    expect(chapter.colorists).toEqual(series.colorists);
    expect(chapter.summaryLocked).toBe(false);
    expect(chapter.genresLocked).toBe(false);
    expect(chapter.writerLocked).toBe(false);
    expect(chapter.coverArtistLocked).toBe(false);
    expect(chapter.publisherLocked).toBe(false);
    expect(chapter.characterLocked).toBe(false);
    expect(chapter.pencillerLocked).toBe(false);
    expect(chapter.inkerLocked).toBe(false);
    expect(chapter.imprintLocked).toBe(false);
    expect(chapter.coloristLocked).toBe(false);
    expect(chapter.lettererLocked).toBe(false);
    expect(chapter.editorLocked).toBe(false);
    expect(chapter.translatorLocked).toBe(false);
    expect(chapter.teamLocked).toBe(false);
    expect(chapter.locationLocked).toBe(false);
    expect(chapter.ageRatingLocked).toBe(false);
    expect(chapter.releaseDateLocked).toBe(false);
    expect(chapter.sortOrderLocked).toBe(false);
    expect(chapter.isbnLocked).toBe(false);
    expect(chapter.languageLocked).toBe(false);
  });
});
