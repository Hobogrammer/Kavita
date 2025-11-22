import {RequiredLoginParams, RequiredSeriesParams} from 'utils/playwright-utils';
import {test, expect, Locator} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {Library, LibraryType} from "src/app/_models/library/library";
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
import { LibraryFactory } from "utils/factories/library-factory";
import { faker } from "@faker-js/faker";

test.describe('Volume detail page', ()=> {
  let user: User;
  let library: Library;
  let series: Series;
  let loginParams: RequiredLoginParams;
  let seriesParams: RequiredSeriesParams;

 test.beforeEach(async ({page}) => {
    user = UserFactory.createUser();
    library = LibraryFactory.create("epub", LibraryType.Book, [FileTypeGroup.Epub], ["/epubs"]);
    series = SeriesFactory.create(library, MangaFormat.EPUB);
    const seriesMetadata = SeriesFactory.createSeriesMetadataForSeries(series);
    series.volumes = SeriesFactory.createVolumesForSeries(series);
    const seriesDetail = SeriesFactory.createSeriesDetailForSeries(series);

    seriesTimeLeft = {
      minHours: 1,
      maxHours: 999,
      avgHours: 666
    } as HourEstimateRange;

    seriesDetailPlus = {
      reviews: []
    } as SeriesDetailPlus;

    seriesRelated = {
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

    seriesRating = {
      averageScore: 0,
      meanScore: 0,
      favoriteCount: 0,
      provider: ScrobbleProvider.Kavita,
      providerUrl: undefined,
      authority: RatingAuthority.User
    } as Rating;

    loginParams = {
      adminExists: true,
      user: user
    };

    seriesParams = {
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
    };
 });

 test('should display volume detail metadata', async ({page}) => {
   setLoginRoutes(page, loginParams);
   setSeriesRoutes(page, seriesParams);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
 });

 test('Detail tab should show expected data', async ({page}) => {
   setLoginRoutes(page, loginParams);
   setSeriesRoutes(page, seriesParams);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
 });

 test('Book tab should show expected volume', async ({page}) => {
   setLoginRoutes(page, loginParams);
   setSeriesRoutes(page, seriesParams);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
 });
});
