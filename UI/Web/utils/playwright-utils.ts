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
import * as defaultLocale from "tests/data/locale.json";
import { faker } from "@faker-js/faker";

export interface HomeRoutes {
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

export interface LoginRoutes {
  adminExists: boolean;
  user: User;
};

export interface SeriesRoutes {
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

export interface VolumeRoutes {
  pluginVersion: string;
  device: Array<any>;
  validLicense: boolean;
  libraries: Array<Library>;
  libraryType: LibraryType;
  hasLibraryAccess: boolean;
  sideNav: Array<SideNavStream>;
  volume: Volume;
  chapterDetailPlus: ChapterDetailPlus;
  listsForChapter: Array<any>;
  rating: Rating;
  volumeImageFilePath: string;
  series: Series;
  publisherImageFilePath: string;
  libraryImageFilePath: string;
  user: User;
};

export async function setHomeRoutes(page: Page, routes: HomeRoutes) {
  await setRoute(page, environment.apiUrl + 'plugin/version?*', routes.pluginVersion);
  await setRoute(page, environment.apiUrl + 'device', routes.device);
  await setRoute(page, environment.apiUrl + 'license/valid-license?*', routes.validLicense);
  const connectionId: string = faker.string.alpha({length: 22, casing: 'mixed'});
  const connectionToken: string = faker.string.alpha({length: 22, casing: 'mixed'});
  await setRoute(page, environment.hubUrl + 'messages/negotiate?*',
    {
      "negotiateVersion":1,
      "connectionId": connectionId,
      "connectionToken": connectionToken,
      "availableTransports":
        [
          {
            "transport":"WebSockets",
            "transferFormats":["Text","Binary"]
          }
        ]
    }
  );

  await setWebSocketRoute(page, environment.hubUrl.slice(7) + 'messages?**', routes.user);
  await setRoute(page, environment.apiUrl + 'scrobbling/token-expired?**', routes.tokenExpired);
  await setRoute(page, environment.apiUrl + 'stream/dashboard?**', routes.dashboard);
  await setRoute(page, environment.apiUrl + 'stream/sidenav?**', routes.sideNav);
  await setRoute(page, environment.apiUrl + 'library/libraries', routes.libraries);
  await setRoute(page, environment.apiUrl + 'series/recently-updated-series', routes.recentlyUpdated);
  await setRoute(page, environment.apiUrl + 'series/recently-added-v2?**', routes.recentlyAdded);
}

export async function setLoginRoutes(page: Page, routes: LoginRoutes) {
  setRoute(page, environment.apiUrl + 'admin/exists', routes.adminExists);
  setRoute(page, environment.apiUrl + 'theme', [defaultSiteTheme]);
  setRoute(page, environment.apiUrl + 'locale', defaultLocale);
  setRoute(page, environment.apiUrl + 'account/login', routes.user);
}

export async function setSeriesRoutes(page: Page, routes: SeriesRoutes) {
  await setRoute(page, environment.apiUrl + 'users/has-library-access?*', routes.hasLibraryAccess);
  await setRoute(page, environment.apiUrl + 'license/info?*', undefined, { status: 204 });
  await setRoute(page, environment.apiUrl + 'scrobbling/has-hold?*', routes.hasScrobblingHold);
  await setRoute(page, environment.apiUrl + 'series/*', routes.series);
  await setRoute(page, environment.apiUrl + 'series/metadata?*', routes.metadata);
  await setRoute(page, environment.apiUrl + 'scrobbling/library-allows-scrobbling?*', routes.libraryAllowsScrobbling);
  await setRoute(page, environment.apiUrl + 'want-to-read?*', routes.wantToRead);
  await setRoute(page, environment.apiUrl + 'readinglist/lists-for-series?*', routes.listForSeries);
  await setRoute(page, environment.apiUrl + 'collection/all-series?*', routes.collection);
  await setRoute(page, environment.apiUrl + 'reader/series-bookmarks?*', routes.bookmarks);
  await setRoute(page, environment.apiUrl + 'reader/time-left?*', routes.timeLeft);
  await setRoute(page, environment.apiUrl + 'reader/has-progress?*', routes.hasProgress);
  await setRoute(page, environment.apiUrl + 'reader/continue-point?*', routes.continuePoint);
  await setRoute(page, environment.apiUrl + 'library/type?*', routes.libraryType);
  await setRoute(page, environment.apiUrl + 'metadata/series-detail-plus?*', routes.detailPlus);
  await setRoute(page, environment.apiUrl + 'series/all-related?*', routes.related);
  await setRoute(page, environment.apiUrl + 'series/series-detail?*', routes.detail);
  await setRoute(page, environment.apiUrl + 'rating/overall-series?*', routes.rating);
  await setImageRoute(page, environment.apiUrl + 'image/library-cover?*', routes.libraryImageFilePath);
  await setImageRoute(page, environment.apiUrl + 'image/series-cover?*', routes.coverImageFilePath);
  await setImageRoute(page, environment.apiUrl + 'image/publisher?*', routes.publisherImageFilePath);
}

export async function setVolumeRoutes(page: Page, routes: VolumeRoutes) {
  await setRoute(page, environment.apiUrl + 'plugin/version?*', routes.pluginVersion);
  await setRoute(page, environment.apiUrl + 'device', routes.device);
  await setRoute(page, environment.apiUrl + 'license/valid-license?*', routes.validLicense);
  await setRoute(page, environment.apiUrl + 'users/has-library-access?*', routes.hasLibraryAccess);
  await setRoute(page, environment.apiUrl + 'library/libraries', routes.libraries);
  await setRoute(page, environment.apiUrl + 'library/type?*', routes.libraryType);
  await setRoute(page, environment.apiUrl + 'series/*', routes.series);
  await setRoute(page, environment.apiUrl + 'stream/sidenav?**', routes.sideNav);
  await setRoute(page, environment.apiUrl + 'volume?*', routes.volume);
  await setRoute(page, environment.apiUrl + 'chapter/chapter-detail-plus?*', routes.chapterDetailPlus);
  await setRoute(page, environment.apiUrl + 'readinglist/lists-for-chapter?*', routes.listsForChapter);
  await setRoute(page, environment.apiUrl + 'rating/overall-chapter?*', routes.rating);
  await setImageRoute(page, environment.apiUrl + 'image/library-cover?*', routes.libraryImageFilePath);
  await setImageRoute(page, environment.apiUrl + 'image/volume-cover?*', routes.volumeImageFilePath);
  const connectionId: string = faker.string.alpha({length: 22, casing: 'mixed'});
  const connectionToken: string = faker.string.alpha({length: 22, casing: 'mixed'});
  await setRoute(page, environment.hubUrl + 'messages/negotiate?*',
    {
      "negotiateVersion":1,
      "connectionId": connectionId,
      "connectionToken": connectionToken,
      "availableTransports":
        [
          {
            "transport":"WebSockets",
            "transferFormats":["Text","Binary"]
          }
        ]
    }
  );

  await setWebSocketRoute(page, environment.hubUrl.slice(7) + 'messages?**', routes.user);
}

export async function setRoute(page: Page, url: string, response: any, options?: any) {
  await page.route(url, async route => {
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
