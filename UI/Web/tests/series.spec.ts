import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {Library} from "src/app/_models/library/library";
import { HourEstimateRange } from "src/app/_models/series-detail/hour-estimate-range";
import {User} from "src/app/_models/user";
import { environment } from "src/environments/environment";
import { LibraryBuilder } from "utils/library-builder";
import { setRoute } from "utils/playwright-utils";
import { UserBuilder } from "utils/user-builder";

test.describe('Series Detail page', () => {
  test('should show expected metadata', async ({page}) => {
    const user: User = new UserBuilder()
      .setUsername("user")
      .setEmail("user@address.com")
      .addRoles(
        [
          "Login"
        ])
      .build();

    const library = new LibraryBuilder()
      .build();
    const series = new SeriesBuilder() // Series Generator?
      .build();

    const seriesTimeLeft = {
      minHours: 1,
      maxHours: 999,
      avgHours: 666
    } as HourEstimateRange;

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
    await setRoute(page, environment.apiUrl + 'reader/continue-point?*', volumeChapter);
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
