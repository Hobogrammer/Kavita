import {faker} from "@faker-js/faker";
import {Chapter} from "../../src/app/_models/chapter";
import {MangaFile} from "../../src/app/_models/manga-file";
import {MangaFormat} from "../../src/app/_models/manga-format";
import {AgeRating} from "../../src/app/_models/metadata/age-rating";
import {PublicationStatus} from "../../src/app/_models/metadata/publication-status";
import {Series} from "../../src/app/_models/series";
import {ChapterBuilder} from "../builders/chapter-builder";

export abstract class ChapterFactory {
  private static NEGATIVE_HUNDRED_K: string = "-100000";

  static createChapterForSeries(count: number, series: Series, totalCount: number, volumeId: number): Chapter {
    return new ChapterBuilder()
      .setId(faker.number.int({min: 1, max: 100}))
      .setRange(this.NEGATIVE_HUNDRED_K)
      .setVolumeId(volumeId)
      .setWordCount(faker.number.int({min: 1000, max: 1000000}))
      .setCount(count)
      .setTotalCount(totalCount)
      .setLanguage("en")
      .setSummary(faker.lorem.paragraph())
      .setAgeRating(AgeRating.Everyone)
      .setPublicationStatus(PublicationStatus.Completed)
      .addFiles([this.createFile(series, count)])
      // @ts-ignore
      .addTags(series.tags || [])
      .addWriters(series.writers || [])
      .addPublishers(series.publishers || [])
      .addCharacters(series.characters || [])
      .addLocations(series.locations || [])
      .addTranslators(series.translators || [])
      .addCoverArtists(series.coverArtists || [])
      .addPencillers(series.pencillers || [])
      .addInkers(series.inkers || [])
      .addImprints(series.imprints || [])
      .addTeams(series.teams || [])
      .addEditors(series.editors || [])
      .addLetterers(series.letterers || [])
      .addColorists(series.colorists || [])
      .setSummaryLocked(false)
      .setGenresLocked(false)
      .setTagsLocked(false)
      .setWriterLocked(false)
      .setCoverArtistLocked(false)
      .setPublisherLocked(false)
      .setCharacterLocked(false)
      .setPencillerLocked(false)
      .setInkerLocked(false)
      .setImprintLocked(false)
      .setColoristLocked(false)
      .setLettererLocked(false)
      .setEditorLocked(false)
      .setTranslatorLocked(false)
      .setTeamLocked(false)
      .setLocationLocked(false)
      .setAgeRatingLocked(false)
      .setReleaseDateLocked(false)
      .setSortOrderLocked(false)
      .setIsbnLocked(false)
      .setLanguageLocked(false)
      .build();
  }

  private static createFile(series: Series, count: number): MangaFile {
    return {
      id: faker.number.int(),
      filePath: series.folderPath + '/' + series.name + ' - Vol ' + count.toString() + '.epub',
      pages: faker.number.int(),
      format: MangaFormat.EPUB,
      created: faker.date.past().toISOString(),
      bytes: faker.number.int({min: 1024, max: 99999}),
    } as MangaFile;
  }
}
