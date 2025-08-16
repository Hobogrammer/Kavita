import {inject, Injectable } from "@angular/core";
import LocalRepository from '../local-object-store/local-repository';
import { Library } from "src/app/_models/library/library";
import { Series } from "src/app/_models/series";
import { SeriesDetail } from "src/app/_models/series-detail/series-detail";
import { SeriesMetadata } from "src/app/_models/metadata/series-metadata";

@Injectable({
  providedIn: 'root'
})
export class LocalRepositoryService {
  private db: LocalRepository = inject(LocalRepository);
  public async addLibary(value: Library) {
    return await this.db.libraries.add(value);
  }

  public async addSeries(value: Series) {
    return await this.db.series.add(value);
  }

  public async addSeriesDetail(value: SeriesDetail) {
    return await this.db.seriesDetails.add(value);
  }

  public async addSeriesMetadata(value: SeriesMetadata) {
    return await this.db.seriesMetadata.add(value);
  }
  public async getAllLibraries(){
    return this.db.libraries.toCollection();
  }

  public async getLibraryById(id: number) {
    return this.db.libraries.where({ id: id });
  }

  public async getSeriesById(seriesId: number) {
    return this.db.series.where({ seriesId: seriesId });
  }

  public async getSeriesDetailBySeriesId(seriesId: number) {
    return this.db.seriesDetails.where({ seriesId: seriesId });
  }

  public async getSeriesMetadataBySeriesId(seriesId: number) {
    return this.db.seriesMetadata.where({ seriesId: seriesId });
  }

}
