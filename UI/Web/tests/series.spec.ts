import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {LibraryType} from "src/app/_models/library/library";
import {HourEstimateRange} from "src/app/_models/series-detail/hour-estimate-range";
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {UserFactory } from "utils/factories/user-factory";
import {LibraryBuilder} from "utils/builders/library-builder"
import {defaultSiteTheme, RequiredHomeParams,
  RequiredLoginParams, RequiredSeriesParams, setHomeRoutes, setLoginRoutes, setRoute, setSeriesRoutes, setWebSocketRoute} from "utils/playwright-utils";
import {SeriesDetailPlus} from "src/app/_models/series-detail/series-detail-plus";
import {RelatedSeries} from "src/app/_models/series-detail/related-series";
import {ScrobbleProvider} from "src/app/_services/scrobbling.service";
import {Rating, RatingAuthority} from "src/app/_models/rating";
import {Series} from "src/app/_models/series";
import {SeriesMetadata} from "src/app/_models/metadata/series-metadata";
import {SeriesDetail} from "src/app/_models/series-detail/series-detail";
import {SeriesFactory} from "utils/factories/series-factory";
import { MangaFormat } from "src/app/_models/manga-format";
import { SeriesPage } from "pages/SeriesPage";
import { faker } from "@faker-js/faker";
import { DashboardStream } from "src/app/_models/dashboard/dashboard-stream";
import { StreamType } from "src/app/_models/dashboard/stream-type.enum";
import { Observable } from "rxjs";
import { SideNavStreamType } from "src/app/_models/sidenav/sidenav-stream-type.enum";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { LibraryFactory } from "utils/factories/library-factory";

test.describe('Series Detail page', () => {
  test.describe('as a regular user', () => {
    test('should show expected metadata', async ({page}) => {
      const user: User = UserFactory.createUser();
      const library = LibraryFactory.create("epub", LibraryType.Book, [FileTypeGroup.Epub], ["/epubs"]);
      let series: Series = SeriesFactory.create(library, MangaFormat.EPUB);
      const seriesMetadata: SeriesMetadata = SeriesFactory.createSeriesMetadataForSeries(series);
      series.volumes = SeriesFactory.createVolumesForSeries(series);
      const seriesDetail: SeriesDetail = SeriesFactory.createSeriesDetailForSeries(series);
      const seriesGroup = SeriesFactory.createSeriesGroupForSeries(library, series);


      const seriesTimeLeft = {
        minHours: 1,
        maxHours: 999,
        avgHours: 666
      } as HourEstimateRange;

      const seriesDetailPlus = {
        reviews: []
      } as SeriesDetailPlus;

      const seriesRelated = {
        sourceSeriesId: series.id,
        sequels: [],
        prequels: [],
        spinOffs: [],
        adaptations: [],
        sideStories: [],
        characters: [],
        contains: [],
        others: [],
        alternativeSettings: [],
        alternativeVersions: [],
        doujinshis: [],
        parent: [],
        editions: [],
        annuals: []
      } as RelatedSeries;

      const seriesRating = {
        averageScore: 0,
        meanScore: 0,
        favoriteCount: 0,
        provider: ScrobbleProvider.Kavita,
        providerUrl: undefined,
        authority: RatingAuthority.User
      } as Rating;

      const recentlyUpdated = {
        id: 2,
        name: "recently-updated",
        isProvided: true,
        order: 2,
        smartFilterEncoded: undefined,
        smartFilterId: 0,
        streamType: StreamType.RecentlyUpdated,
        visible:true,
        api: Observable.prototype
      } as DashboardStream;

      const newlyAdded = {
        id: 3,
        name: "newly-added",
        isProvided: true,
        order: 1,
        smartFilterEncoded: undefined,
        smartFilterId: 0,
        streamType: StreamType.NewlyAdded,
        visible: true,
        api: Observable.prototype
      } as DashboardStream;

      const sideNav = {
        id: 2,
        name: library.name,
        isProvided: false,
        order: 1,
        smartFilterEncoded: undefined,
        smartFilterId: 0,
        streamType: SideNavStreamType.Library,
        externalSourceId: 0,
        externalSource: undefined,
        visible: true,
        libraryId: library.id,
        library: library
      } as SideNavStream;

      // Home page requirements

      const loginParams = {
        adminExists: true,
        user: user
      } as RequiredLoginParams;

      setLoginRoutes(page, loginParams);

      const homeParams = {
        pluginVersion: '0.8.7.0',
        device: [],
        validLicense: false,
        user: user,
        dashboard: [recentlyUpdated, newlyAdded],
        sideNav: [sideNav],
        libraries: [library],
        recentlyUpdated: [seriesGroup],
        recentlyAdded: [series],
        tokenExpired: false
      } as RequiredHomeParams;

      setHomeRoutes(page, homeParams);

      // Series Page requirements
      const seriesParams = {
        hasLibraryAccess: true,
        hasScrobblingHold: false,
        libraryAllowsScrobbling: false,
        metadata: seriesMetadata,
        wantToRead: false,
        listForSeries: [],
        collection: [],
        bookmarks: [],
        timeLeft: seriesTimeLeft,
        hasProgress: false,
        continuePoint: series.volumes[0].chapters[0],
        libraryType: library.type,
        series: series,
        detailPlus: seriesDetailPlus,
        related: seriesRelated,
        detail: seriesDetail,
        rating: seriesRating,
        coverImageFilePath: "src/assets/images/image-placeholder.dark.png",
        publisherImageFilePath: "src/assets/images/error-person-missing.dark.png",
        libraryImageFilePath: "src/assets/images/ExternalServices/GoogleBooks.png"
      } as RequiredSeriesParams;

      setSeriesRoutes(page, seriesParams);

      // Login
      const loginPage = new LoginPage(page);
      await loginPage.login(user.username, "imagineYourPasswordHere");

      await page.goto('/library/' + library.id + '/series/' + series.id);
      await page.waitForLoadState('networkidle');
      const seriesPage = new SeriesPage(page);
      await expect(seriesPage.title).toHaveText(series.name);
      await expect(seriesPage.title).toBeVisible();
      if (series.summary) {
        await expect(seriesPage.summary).toHaveText(series.summary);
      }
    });
  });
});
