import {Library} from "src/app/_models/library/library";
import {Series} from "src/app/_models/series";
import {faker} from '@faker-js/faker';
import { SeriesBuilder } from "./series-builder";
import { Volume } from "src/app/_models/volume";
import { MangaFormat } from "src/app/_models/manga-format";
import { Person } from "src/app/_models/metadata/person";
import { SeriesMetadata } from "src/app/_models/metadata/series-metadata";
import { SeriesMetadataBuilder } from "./series-metadata-builder";
export class SeriesFactory {
  constructor() {}

  createSeries(library: Library, format: MangaFormat, volumeCount: number = 5): Series {
    const name: string = faker.book.series();
    const volumes: Array<Volume> = this.createVolumes(volumeCount);
    const publisher = {
      id: faker.number.int(),
      name: faker.company.name(),
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
      .setPages(faker.number.int())
      .setLibraryId(library.id)
      .setLibraryName(library.name)
      .setPrimaryColor(faker.color.rgb())
      .setSecondaryColor(faker.color.rgb())
      .addVolumes(volumes)
      .addPublishers([publisher])
      .build();

    return series;
  }

  private createVolumes(volumeCount: number): Array<Volume> {
    const volumes: Array<Volume> = new Array<Volume>();

    for (let i = 0; i < volumeCount; i++) {
      const volume = {} as Volume;
      volumes.push(volume);
    }

    return volumes;
  }
}
export function createMetadataForSeries(series: Series): SeriesMetadata {
  return new SeriesMetadataBuilder()
    .setSeriesId(series.id)
    .addWriters(series.writers)
    .addPublishers(series.publishers)
    .build();
}
