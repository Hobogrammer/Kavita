import {Page} from '@playwright/test';
import { Chapter } from "src/app/_models/chapter";
import { DashboardStream } from "src/app/_models/dashboard/dashboard-stream";
import { Library, LibraryType } from "src/app/_models/library/library";
import { SeriesMetadata } from "src/app/_models/metadata/series-metadata";
import {SiteTheme} from "src/app/_models/preferences/site-theme";
import { Rating } from "src/app/_models/rating";
import { Series } from "src/app/_models/series";
import { HourEstimateRange } from "src/app/_models/series-detail/hour-estimate-range";
import { RelatedSeries } from "src/app/_models/series-detail/related-series";
import { SeriesDetail } from "src/app/_models/series-detail/series-detail";
import { SeriesDetailPlus } from "src/app/_models/series-detail/series-detail-plus";
import { SeriesGroup } from "src/app/_models/series-group";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { User } from "src/app/_models/user";
import { environment } from "src/environments/environment";
import * as defaultLocale from "tests/data/locale.json"

export interface RequiredHomeParams {
  pluginVersion: string;
  device: Array<any>;
  validLicense: boolean;
  user: User;
  dashboard: Array<DashboardStream>;
  sideNav: Array<SideNavStream>;
  libraries: Array<Library>;
  recentlyUpdated: Array<SeriesGroup>;
  recentlyAdded: Array<Series>;
  tokenExpired: boolean;
};

export interface RequiredLoginParams {
  adminExists: boolean;
  user: User;
};

export interface RequiredSeriesParams {
  hasLibraryAccess: boolean;
  hasScrobblingHold: boolean;
  libraryAllowsScrobbling: boolean;
  metadata: SeriesMetadata;
  wantToRead: boolean;
  listForSeries: Array<any>;
  collection: Array<any>;
  bookmarks: Array<any>;
  timeLeft: HourEstimateRange;
  hasProgress: boolean;
  continuePoint: Chapter;
  libraryType: LibraryType;
  series: Series;
  detailPlus: SeriesDetailPlus;
  related: RelatedSeries;
  detail: SeriesDetail;
  rating: Rating;
  coverImageFilePath: string;
  publisherImageFilePath: string;
  libraryImageFilePath: string;
};

export async function setHomeRoutes(page: Page, params: RequiredHomeParams) {
  await setRoute(page, environment.apiUrl + 'plugin/version?*', params.pluginVersion);
  await setRoute(page, environment.apiUrl + 'device', params.device);
  await setRoute(page, environment.apiUrl + 'license/valid-license?*', params.validLicense);
  await setRoute(page, environment.hubUrl + 'messages/negotiate?*',
    {
      "negotiateVersion":1,
      "connectionId":"CkiMkPYyP0yzWnGbPdQDpQ",
      "connectionToken":"gMyUQzklsSovnbLmprJgPA",
      "availableTransports":
        [
          {
            "transport":"WebSockets",
            "transferFormats":["Text","Binary"]
          }
        ]
    }
  );

  await setWebSocketRoute(page, environment.hubUrl.slice(7) + 'messages?**', params.user);
  await setRoute(page, environment.apiUrl + 'scrobbling/token-expired?**', params.tokenExpired);
  await setRoute(page, environment.apiUrl + 'stream/dashboard?**', params.dashboard);
  await setRoute(page, environment.apiUrl + 'stream/sidenav?**', params.sideNav);
  await setRoute(page, environment.apiUrl + 'library/libraries', params.libraries);
  await setRoute(page, environment.apiUrl + 'series/recently-updated-series', params.recentlyUpdated);
  await setRoute(page, environment.apiUrl + 'series/recently-added-v2?**', params.recentlyAdded);
}

export async function setLoginRoutes(page: Page, params: RequiredLoginParams) {
  setRoute(page, environment.apiUrl + 'admin/exists', params.adminExists);
  setRoute(page, environment.apiUrl + 'theme', [defaultSiteTheme]);
  setRoute(page, environment.apiUrl + 'locale', defaultLocale);
  setRoute(page, environment.apiUrl + 'account/login', params.user);
}

export async function setSeriesRoutes(page: Page, params: RequiredSeriesParams) {
  await setRoute(page, environment.apiUrl + 'users/has-library-access?*', params.hasLibraryAccess);
  await setRoute(page, environment.apiUrl + 'license/info?*', undefined, { status: 204 });
  await setRoute(page, environment.apiUrl + 'scrobbling/has-hold?*', params.hasScrobblingHold);
  await setRoute(page, environment.apiUrl + 'series/*', params.series);
  await setRoute(page, environment.apiUrl + 'scrobbling/library-allows-scrobbling?*', params.libraryAllowsScrobbling);
  await setRoute(page, environment.apiUrl + 'series/metadata?**', params.metadata);
  await setRoute(page, environment.apiUrl + 'want-to-read?*', params.wantToRead);
  await setRoute(page, environment.apiUrl + 'readinglist/lists-for-series?*', params.listForSeries);
  await setRoute(page, environment.apiUrl + 'collection/all-series?*', params.collection);
  await setRoute(page, environment.apiUrl + 'reader/series-bookmarks?*', params.bookmarks);
  await setRoute(page, environment.apiUrl + 'reader/time-left?*', params.timeLeft);
  await setRoute(page, environment.apiUrl + 'reader/has-progress?*', params.hasProgress);
  await setRoute(page, environment.apiUrl + 'reader/continue-point?*', params.continuePoint);
  await setRoute(page, environment.apiUrl + 'library/type?*', params.libraryType);
  await setRoute(page, environment.apiUrl + 'metadata/series-detail-plus?*', params.detailPlus);
  await setRoute(page, environment.apiUrl + 'series/all-related?*', params.related);
  await setRoute(page, environment.apiUrl + 'series/series-detail?*', params.detail);
  await setRoute(page, environment.apiUrl + 'rating/overall-series?*', params.rating);
  await setImageRoute(page, environment.apiUrl + 'image/library-cover?*', params.libraryImageFilePath);
  await setImageRoute(page, environment.apiUrl + 'image/series-cover?*', params.coverImageFilePath);
  await setImageRoute(page, environment.apiUrl + 'image/publisher?*', params.publisherImageFilePath);
}

export async function setRoute(page: Page, url: string, response: any, options?: any) {
  await page.route(url, async route => {
    console.log('Fulfilling route: ' + url + ' with response: ' + JSON.stringify(response));
    if (options?.status !== 204) {
      await route.fulfill({
        contentType: options?.contentType || "application/json",
        status: options?.status || 200,
        body: JSON.stringify(response)
      });
    } else {
      await route.fulfill({
        status: options?.status
      });
    }
  });
}

export async function setImageRoute(page: Page, url: string, filePath: string) {
  await page.route(url, async route => {
    await route.fulfill({contentType: 'image/png', status: 200, path: filePath});
  });
}

export async function setWebSocketRoute(page: Page, url: string, user: User) {
  await page.routeWebSocket('ws://'+ url, ws => {
    console.log("Serving on WebSocket");
    ws.onMessage(message => {
      switch (message) {
        case "{'protocol':'json','version':1}":
          ws.send(JSON.stringify({}));
          ws.send(JSON.stringify({"type":1,"target":"OnlineUsers","arguments":[[user.username]]}));
          break;
        default:
          ws.send("{}");
          break;
      }
    });
  });
}

export const defaultSiteTheme = {
  id:1,
  name: "Dark",
  normalizedName: "dark",
  fileName: "dark.scss",
  isDefault: true,
  provider: 1,
  previewUrls: [""],
  description:"Default theme shipped with Kavita",
  author: "",
  compatibleVersion: null,
  selector: "bg-dark",
  filePath: "assets/css/dark.scss",
} as SiteTheme;
