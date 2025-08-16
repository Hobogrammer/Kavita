import {inject, Injectable } from "@angular/core";
import LocalRepository from '../local-object-store/local-repository';
import { Library } from "src/app/_models/library/library";
import {Local} from "d3";
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

  }

  public async addSeriesDetail(value: SeriesDetail) {

  }

  public async addSeriesMetadata(value: SeriesMetadata) {

  }
  public async getAllLibraries(){
    return this.db.libraries.toCollection();
  }

}
