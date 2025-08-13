import {LocalDatastoreService} from '../../_services/local-datastore.service'
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {TranslocoDirective} from "@jsverse/transloco";
import {AsyncPipe} from "@angular/common";
import {DownloadButtonComponent} from '../_components/download-button/download-button.component';

@Component({
  selector: 'app-cache-button',
  imports: [
    AsyncPipe,
    NgbTooltip,
    TranslocoDirective
  ],
  templateUrl: './cache-button.componenet.html',
  styleUrls: ['./cache-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CacheButtonComponent extends DownloadButtonComponent {

  downloadClicked() {
    if (this.isDownloading) return;

    this.cacheService.download(this.entityType, this.entity, d => {
      this.isDownloading = !!d;
      this.cdRef.markForCheck();
    });
  }

}
