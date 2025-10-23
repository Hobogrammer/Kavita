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
      .setOriginalName(name)
      .setLocalizedName(name)
      .setSortName(name)
      .setFormat(format)
      .addVolumes([])
      .setPages(faker.number.int())
      .setLibraryId(library.id)
      .setLibraryName(library.name)
      .setPrimaryColor(faker.color.rgb())
      .setSecondaryColor(faker.color.rgb())
      .addPublishers([publisher])
      .addWriters([writer])
      .build();

    return series;
  }

  public static createSeriesMetadataForSeries(series: Series): SeriesMetadata {
    return new SeriesMetadataBuilder()
      .setSeriesId(series.id)
      .addWriters(series.writers)
      .addPublishers(series.publishers)
      .build();
  }

  public static createSeriesDetailForSeries(series: Series): SeriesDetail {
    return {
      specials: [],
      chapters: [],
      volumes: series.volumes,
      storylineChapters: [],
      unreadCount: 1,
      totalCount: 1,
      publishers: series.publishers
    } as SeriesDetail;
  }
  static createVolumesForSeries(series: Series, volumeCount: number = 5): Array<Volume> {
    const volumes: Array<Volume> = new Array<Volume>();
    const volumeId = faker.number.int({min: 1, max: 999});
    const seriesTimeLeft = {
      minHours: 1,
      maxHours: 999,
      avgHours: faker.number.int({min: 1, max: 999}),
    } as HourEstimateRange;

    for (let count = 0; count < volumeCount; count++) {
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
          ChapterFactory.createChapterForSeries(count, series, volumeCount, volumeId)
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
