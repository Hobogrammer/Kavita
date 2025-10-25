import {Library} from "src/app/_models/library/library";
import {Series} from "src/app/_models/series";
import {faker} from '@faker-js/faker';
import {Volume} from "../../src/app/_models/volume";
import {MangaFormat} from "../../src/app/_models/manga-format";
import {Person} from "../../src/app/_models/metadata/person";
import {SeriesMetadata} from "../../src/app/_models/metadata/series-metadata";
import {SeriesDetail} from "../../src/app/_models/series-detail/series-detail";
import {SeriesBuilder} from "../builders/series-builder";
import {SeriesMetadataBuilder} from "../builders/series-metadata-builder";
import {HourEstimateRange} from "../../src/app/_models/series-detail/hour-estimate-range";
import {ChapterFactory} from "./chapter-factory";
import { PublicationStatus } from "../../src/app/_models/metadata/publication-status";
import { AgeRating } from "../../src/app/_models/metadata/age-rating";

export class SeriesFactory {
  private constructor() {}

  public static create(library: Library, format: MangaFormat): Series {
    const name: string = faker.book.series();
    const publisher = {
      id: faker.number.int(),
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      aliases: [],
      primaryColor: faker.color.rgb(),
      secondaryColor: faker.color.rgb(),
      coverImageLocked: false
    } as Person;

    const writer = {
      id: faker.number.int(),
      name: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      aliases: [],
      primaryColor: faker.color.rgb(),
      secondaryColor: faker.color.rgb(),
      coverImageLocked: false
    } as Person;

    const series: Series = new SeriesBuilder()
      .setId(faker.number.int())
      .setName(name)
      .setNameLocked(false)
      .setOriginalName(name)
      .setLocalizedName(name)
      .setLocalizedNameLocked(false)
      .setSortName(name)
      .setSortNameLocked(false)
      .setFormat(format)
      .addVolumes([])
      .setCoverImage(faker.image.url())
      .setCoverImageLocked(false)
      .setUserRating(0)
      .setPagesRead(0)
      .setWordCount(faker.number.int())
      .setPages(faker.number.int())
      .setMinHoursToRead(1)
      .setMaxHoursToRead(999)
      .setAvgHoursToRead(faker.number.int({min: 1, max: 999}))
      .setLastChapterAdded(faker.date.past().toISOString())
      .setLatestReadDate(faker.date.recent().toISOString())
      .setLibraryId(library.id)
      .setLibraryName(library.name)
      .setPrimaryColor(faker.color.rgb())
      .setSecondaryColor(faker.color.rgb())
      .addPublishers([publisher])
      .addWriters([writer])
      .addTags([])
      .addGenres([])
      .addCoverArtists([])
      .addCharacters([])
      .addPencillers([])
      .addInkers([])
      .addImprints([])
      .addColorists([])
      .addLetterers([])
      .addEditors([])
      .addTranslators([])
      .addTeams([])
      .addLocations([])
      .setDontMatch(false)
      .setIsBlacklisted(false)
      .setWebLinks("")
      .build();

    return series;
  }

  public static createSeriesMetadataForSeries(series: Series): SeriesMetadata {
    return new SeriesMetadataBuilder()
      .setSeriesId(series.id)
      .setSummary(faker.lorem.paragraph())
      .setSummaryLocked(false)
      .addWriters(series.writers)
      .setWriterLocked(false)
      .addPublishers(series.publishers)
      .setPublisherLocked(false)
      .addTags([])
      .setTagsLocked(false)
      .addGenres([])
      .setGenresLocked(false)
      .addCoverArtists(series.coverArtists)
      .setCoverArtistLocked(false)
      .addInkers(series.inkers)
      .setInkerLocked(false)
      .addCharacters(series.characters)
      .setCharacterLocked(false)
      .addPencillers(series.pencillers)
      .setPencillerLocked(false)
      .addImprints(series.imprints)
      .setImprintLocked(false)
      .addColorists(series.colorists)
      .setColoristLocked(false)
      .addLetterers(series.letterers)
      .setLettererLocked(false)
      .addEditors(series.editors)
      .setEditorLocked(false)
      .addTranslators(series.translators)
      .setTranslatorLocked(false)
      .addTeams(series.teams)
      .setTeamLocked(false)
      .addLocations(series.locations)
      .setLocationLocked(false)
      .setLanguage(faker.location.language().alpha2)
      .setLanguageLocked(false)
      .setPublicationStatus(PublicationStatus.Completed)
      .setPublicationStatusLocked(false)
      .setReleaseYear(faker.date.past().getFullYear())
      .setReleaseYearLocked(false)
      .setAgeRating(AgeRating.Everyone)
      .setWebLinks("")
      .setMaxCount(1)
      .setTotalCount(0)
      .build();
  }

  public static createSeriesDetailForSeries(series: Series): SeriesDetail {
    return {
      specials: [],
      chapters: [],
      volumes: series.volumes,
      storylineChapters: [],
      unreadCount: series.volumes.length,
      totalCount: series.volumes.length,
    } as SeriesDetail;
  }

  public static createVolumesForSeries(series: Series, totalVolumeCount: number = 5): Array<Volume> {
    const volumes: Array<Volume> = new Array<Volume>();
    const volumeId = faker.number.int({min: 1, max: 999});
    const seriesTimeLeft = {
      minHours: 1,
      maxHours: 999,
      avgHours: faker.number.int({min: 1, max: 999}),
    } as HourEstimateRange;

    for (let count = 0; count < totalVolumeCount; count++) {
      const volume = {
        id: volumeId,
        minNumber: 1,
        maxNumber: 1,
        name: faker.book.title(),
        createdUtc: faker.date.anytime().toISOString(),
        lastModifiedUtc: new Date().toISOString(),
        pages: faker.number.int(),
        pagesRead: 0,
        wordCount: faker.number.int(),
        chapters: [
          ChapterFactory.createChapterForSeries(count, series, totalVolumeCount, volumeId)
        ],
        timeEstimate: seriesTimeLeft,
        minHoursToRead: seriesTimeLeft.minHours,
        maxHoursToRead: seriesTimeLeft.maxHours,
        avgHoursToRead: seriesTimeLeft.avgHours,
        coverImage: faker.image.url(),
        coverImageLocked: false,
        primaryColor: faker.color.rgb(),
        secondaryColor: faker.color.rgb()
      } as Volume;

      volumes.push(volume);
    }

    return volumes;
  }
}
