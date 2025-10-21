import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {LibraryType} from "src/app/_models/library/library";
import {HourEstimateRange} from "src/app/_models/series-detail/hour-estimate-range";
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {UserFactory } from "utils/factories/user-factory";
import {LibraryBuilder} from "utils/builders/library-builder"
import {setRoute} from "utils/playwright-utils";
import {SeriesDetailPlus} from "src/app/_models/series-detail/series-detail-plus";
import {RelatedSeries} from "src/app/_models/series-detail/related-series";
import {ScrobbleProvider} from "src/app/_services/scrobbling.service";
import {Rating, RatingAuthority} from "src/app/_models/rating";
import {Series} from "src/app/_models/series";
import {SeriesMetadata} from "src/app/_models/metadata/series-metadata";
import {SeriesDetail} from "src/app/_models/series-detail/series-detail";
import {SeriesFactory} from "utils/factories/series-factory";
import { MangaFormat } from "src/app/_models/manga-format";

test.describe('Series Detail page', () => {
  test('should show expected metadata', async ({page}) => {
    const user: User = UserFactory.createUser();
    const library = new LibraryBuilder()
      .setName("epub")
      .setType(LibraryType.Book)
      .addExcludePatterns([""])
      .addFolders(["/epubs"])
      .addLibraryFileTypes([FileTypeGroup.Epub])
      .build();
    const series: Series = SeriesFactory.createSeries(library, MangaFormat.EPUB);
    const seriesMetadata: SeriesMetadata = SeriesFactory.createSeriesMetadataForSeries(series);
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

    // Set route required to sucessfully login
    await setRoute(page, environment.apiUrl + 'account/login', user);

    // Series Page requirements
    await setRoute(page, environment.apiUrl + 'users/has-library-access?*', true);
    await setRoute(page, environment.apiUrl + 'scrobbling/has-hold?*', false);
    await setRoute(page, environment.apiUrl + 'scrobbling/library-allows-scrobbling?*', false);
    await setRoute(page, environment.apiUrl + 'series/metadata?*', seriesMetadata);
    await setRoute(page, environment.apiUrl + 'want-to-read?*', false);
    await setRoute(page, environment.apiUrl + 'readinglist/lists-for-series?*', []);
    await setRoute(page, environment.apiUrl + 'collection/all-series?*', []);
    await setRoute(page, environment.apiUrl + 'reader/series-bookmarks?*', []);
    await setRoute(page, environment.apiUrl + 'reader/time-left?*', seriesTimeLeft);
    await setRoute(page, environment.apiUrl + 'reader/has-progress?*', false);
    await setRoute(page, environment.apiUrl + 'reader/continue-point?*', series.volumes[0].chapters[0]);
    await setRoute(page, environment.apiUrl + 'library/type?*', library.type);
    await setRoute(page, environment.apiUrl + 'series/*', series);
    await setRoute(page, environment.apiUrl + 'metadata/series-detail-plus?*', seriesDetailPlus);
    await setRoute(page, environment.apiUrl + 'series/all-related?*', seriesRelated);
    await setRoute(page, environment.apiUrl + 'series/series-detail?*', seriesDetail);
    await setRoute(page, environment.apiUrl + 'rating/overall-series?*', seriesRating);
    await setRoute(page, environment.apiUrl + 'image/series-cover?*', "src/assets/images/image-placeholder.png",
      {contentType: 'image/png'});
    await setRoute(page, environment.apiUrl + 'image/publisher?*', "src/assets/images/ExternalServices/MAL.png",
      {contentType: 'image/png'});

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, "imagineYourPasswordHere");

    await page.goto('/library/' + library.id + '/series/' + series.id);
    await page.waitForLoadState()
    const seriesPage = new SeriesPage(page);
    //
    await expect(page)
  });
});
