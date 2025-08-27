import {DestroyRef, inject, Injectable, OnInit} from "@angular/core";
import {DownloadEntity, DownloadEntityType, DownloadEvent} from "./download.service";
import {asyncScheduler, BehaviorSubject, finalize, Observable, of, take, takeWhile, tap} from "rxjs";
import {download, Download} from "../_models/download";
import {Series} from "src/app/_models/series";
import {Volume} from "src/app/_models/volume";
import {Chapter} from "src/app/_models/chapter";
import {throttleTime} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "./utility.service";
import {environment} from "src/environments/environment";
import {OpfsService} from "./opfs.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export const DEBOUNCE_TIME = 100;

@Injectable({
  providedIn: 'root',
})
export class CacheService {

  private readonly httpClient = inject(HttpClient);
  private opfsService = inject(OpfsService);
  private utilityService = inject(UtilityService);
  private baseUrl = environment.apiUrl;
  private downloadsSource: BehaviorSubject<DownloadEvent[]> = new BehaviorSubject<DownloadEvent[]>([]);
  private readonly destroyRef = inject(DestroyRef);

  cache(entityType: DownloadEntityType, entity: DownloadEntity, callback?: (d: Download | undefined) => void) {

    let downloadCall: Observable<Download>;
    switch (entityType) {
      case 'series':
        downloadCall = this.downloadSeries(entity as Series);
        break;
      case 'volume':
        downloadCall = this.downloadVolume(entity as Volume);
        break;
      case 'chapter':
        downloadCall = this.downloadChapter(entity as Chapter);
        break;
      default:
        return;
    }

    return (downloadCall || of(undefined)).pipe(
      tap((d) => {
        if (callback) callback(d);
      }),
      takeWhile((val: Download) => {
        return val.state != 'DONE';
      }),
      finalize(() => {
        if (callback) callback(undefined);
      })),
      takeUntilDestroyed(this.destroyRef);
  }

  private downloadSeries(series: Series) {

    // TODO: Call backend for all the volumes and loose leaf chapters then enqueque them all

    const downloadType = 'series';
    const subtitle = this.downloadSubtitle(downloadType, series);
    return this.httpClient.get(this.baseUrl + 'download/series?seriesId=' + series.id,
      {observe: 'events', responseType: 'blob', reportProgress: true}
    ).pipe(
      throttleTime(DEBOUNCE_TIME, asyncScheduler, { leading: true, trailing: true }),
      download((blob, filename) => {
        //this.save(blob, decodeURIComponent(filename));
        return [blob, decodeURIComponent(filename)]
      }),
      tap((d) => this.updateDownloadState(d, downloadType, subtitle, series.id)),
      finalize(() => this.finalizeDownloadState(downloadType, subtitle))
    );
  }

  private downloadChapter(chapter: Chapter) {
    return this.downloadEntity(chapter);
  }

  private downloadVolume(volume: Volume) {
    return this.downloadEntity(volume);
  }

  /**
   * Returns the entity subtitle (for the event widget) for a given entity
   * @param downloadEntityType
   * @param downloadEntity
   * @returns
   */
  downloadSubtitle(downloadEntityType: DownloadEntityType | undefined, downloadEntity: DownloadEntity | undefined) {
    switch (downloadEntityType) {
      case 'series':
        return (downloadEntity as Series).name;
      case 'volume':
        return (downloadEntity as Volume).minNumber + '';
      case 'chapter':
        return (downloadEntity as Chapter).minNumber + '';
      case 'bookmark':
        return '';
      case 'logs':
        return '';
    }
    return '';
  }

  private getDownloadEntityType(entity: Chapter | Volume): DownloadEntityType {
    if (this.utilityService.isVolume(entity)) return 'volume';
    if (this.utilityService.isChapter(entity)) return 'chapter';
    if (this.utilityService.isSeries(entity)) return 'series';
    return 'logs'; // This is a hack but it will never occur
  }

  private updateDownloadState(d: Download, entityType: DownloadEntityType, entitySubtitle: string, id: number) {
    let values = this.downloadsSource.getValue();
    if (d.state === 'PENDING') {
      const index = values.findIndex(v => v.entityType === entityType && v.subTitle === entitySubtitle);
      if (index >= 0) return; // Don't let us duplicate add
      values.push({entityType: entityType, subTitle: entitySubtitle, progress: 0, id});
    } else if (d.state === 'IN_PROGRESS') {
      const index = values.findIndex(v => v.entityType === entityType && v.subTitle === entitySubtitle);
      if (index >= 0) {
        values[index].progress = d.progress;
      }
    } else if (d.state === 'DONE') {
      values = values.filter(v => !(v.entityType === entityType && v.subTitle === entitySubtitle));
    }
    this.downloadsSource.next(values);

  }

  private finalizeDownloadState(entityType: DownloadEntityType, entitySubtitle: string) {
    let values = this.downloadsSource.getValue();
    values = values.filter(v => !(v.entityType === entityType && v.subTitle === entitySubtitle));
    this.downloadsSource.next(values);
  }

  private downloadEntity<T>(entity: Chapter | Volume): Observable<any> {
    const downloadEntityType = this.getDownloadEntityType(entity);
    const subtitle = this.downloadSubtitle(downloadEntityType, entity);
    const idKey = this.getIdKey(entity);
    const url = `${this.baseUrl}download/${downloadEntityType}?${idKey}=${entity.id}`;

    return this.httpClient.get(url, { observe: 'events', responseType: 'blob', reportProgress: true }).pipe(
      throttleTime(DEBOUNCE_TIME, asyncScheduler, { leading: true, trailing: true }),
      download((blob, filename) => {
        // create opfs
        //save file in opfs
        // return opfs file location or whatever that returns on save
      }),
      tap((d) => this.updateDownloadState(d, downloadEntityType, subtitle, entity.id)),
      finalize(() => this.finalizeDownloadState(downloadEntityType, subtitle))
    );
  }

  private getIdKey(entity: Chapter | Volume) {
    if (this.utilityService.isVolume(entity)) return 'volumeId';
    if (this.utilityService.isChapter(entity)) return 'chapterId';
    if (this.utilityService.isSeries(entity)) return 'seriesId';
    return 'id';
  }
}
