import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {LibraryType} from "src/app/_models/library/library";
import {HourEstimateRange} from "src/app/_models/series-detail/hour-estimate-range";
import {User} from "src/app/_models/user";
import {UserFactory } from "utils/factories/user-factory";
import {RequiredLoginParams, RequiredSeriesParams, setLoginRoutes, setSeriesRoutes} from "utils/playwright-utils";
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

      const loginParams = {
        adminExists: true,
        user: user
      } as RequiredLoginParams;

      setLoginRoutes(page, loginParams);

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
