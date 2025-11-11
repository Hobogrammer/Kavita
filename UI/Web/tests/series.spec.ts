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
import { SeriesPage } from "pages/SeriesPage";
import { LibraryFactory } from "utils/factories/library-factory";
import { faker } from "@faker-js/faker";

test.describe('Series Detail page', () => {
  let user: User;
  let library: Library;
  let series: Series;
  let seriesMetadata: SeriesMetadata;
  let seriesDetail: SeriesDetail;
  let seriesRelated: RelatedSeries;
  let seriesTimeLeft: HourEstimateRange;
  let seriesDetailPlus: SeriesDetailPlus;
  let seriesRating: Rating;
  let loginParams: RequiredLoginParams;
  let seriesParams: RequiredSeriesParams;

  test.beforeEach(() => {
    user = UserFactory.createUser();
    library = LibraryFactory.create("epub", LibraryType.Book, [FileTypeGroup.Epub], ["/epubs"]);
    series = SeriesFactory.create(library, MangaFormat.EPUB);
    seriesMetadata = SeriesFactory.createSeriesMetadataForSeries(series);
    series.volumes = SeriesFactory.createVolumesForSeries(series);
    seriesDetail = SeriesFactory.createSeriesDetailForSeries(series);

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

  test('should show expected metadata', async ({page}) => {
    setLoginRoutes(page, loginParams);
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

  test.only('shows expected books', async ({page}) => {
    setLoginRoutes(page, loginParams);
    setSeriesRoutes(page, seriesParams);
    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, faker.internet.password());

    await page.goto('/library/' + library.id + '/series/' + series.id);
    await page.waitForLoadState('networkidle');
    const seriesPage = new SeriesPage(page);

    await page.pause();
    expect(seriesPage.booksTab).toContainClass('active');
    const books: Array<Locator> = seriesPage.getBooks();
    expect(books.length).toEqual(series.volumes.length);
  });

  test.describe('as a regular user', () => {
    test('should not show edit button', async ({page}) => {
      setLoginRoutes(page, loginParams);
      setSeriesRoutes(page, seriesParams);
      const loginPage = new LoginPage(page);
      await loginPage.login(user.username, faker.internet.password());

      await page.goto('/library/' + library.id + '/series/' + series.id);
      await page.waitForLoadState('networkidle');
      const seriesPage = new SeriesPage(page);
      expect(seriesPage.editButton).toBeHidden();
    });
  });

  test.describe('as an admin', () => {
    test('should show the edit button', async ({page}) => {
      user = UserFactory.createAdmin();
      loginParams = {
        adminExists: true,
        user: user
      };
      setLoginRoutes(page, loginParams);
      setSeriesRoutes(page, seriesParams);
      const loginPage = new LoginPage(page);
      await loginPage.login(user.username, faker.internet.password());

      await page.goto('/library/' + library.id + '/series/' + series.id);
      await page.waitForLoadState('networkidle');
      const seriesPage = new SeriesPage(page);
      expect(seriesPage.editButton).toBeVisible();
    });
  });
});
