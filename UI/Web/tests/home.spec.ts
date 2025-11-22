import {test, expect} from '@playwright/test';
import { User } from "src/app/_models/user";
import { RequiredHomeParams, RequiredLoginParams, setLoginRoutes, setHomeRoutes} from 'utils/playwright-utils';
import { SeriesFactory} from "utils/factories/series-factory";
import {LibraryFactory} from "utils/factories/library-factory";
import {UserFactory} from "utils/factories/user-factory";
import { DashboardStream } from "src/app/_models/dashboard/dashboard-stream";
import { FileTypeGroup } from "src/app/_models/library/file-type-group.enum";
import { Library, LibraryType } from "src/app/_models/library/library";
import { MangaFile } from "src/app/_models/manga-file";
import { MangaFormat } from "src/app/_models/manga-format";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { SideNavStreamType } from "src/app/_models/sidenav/sidenav-stream-type.enum";
import { StreamType } from "src/app/_models/dashboard/stream-type.enum";
import { Observable } from "rxjs";
import { LoginPage } from "pages/LoginPage"
import { faker } from "@faker-js/faker";

test.describe('Home Page', () => {
  let user: User;
  let library: Library;
  let series: Series;
  let loginParams: RequiredLoginParams;
  let homeParams: RequiredHomeParams;
  const CURRENT_VERSION: string = '0.8.8.6';

  test.beforeEach(async ({page}) => {
    user = UserFactory.createUser();
    library = LibraryFactory.create("epub", LibraryType.Book, [FileTypeGroup.Epub], ["/epubs"]);
    series = SeriesFactory.create(library, MangaFormat.EPUB);

    loginParams = {
      adminExists: true,
      user: user
    };

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
      library: Library
    } as SideNavStream;

    homeParams = {
      pluginVersion: CURRENT_VERSION,
      device: [],
      validLicense: false,
      user: user,
      dashboard: [recentlyUpdated, newlyAdded],
      sideNav: [sideNav],
      libraries: [library],
      recentlyUpdated: [SeriesFactory.createSeriesGroupForSeries(library, series)],
      recentlyAdded: [series],
      tokenExpired: false
    };
  });

  test('should display user name in navigation bar', async ({page}) => {
    setLoginRoutes(page, loginParams);
    setHomeRoutes(page, homeParams);

    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, faker.internet.password());
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/home');

    const homePage = new HomePage(page);
  });

  test('side navigation bar should show the expected', async ({page}) => {
    setLoginRoutes(page, loginParams);
    setHomeRoutes(page, homeParams);

    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, faker.internet.password());
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/home');

    const homePage = new HomePage(page);
  });

  test('dashboard should display expected streams', async ({page}) => {
    setLoginRoutes(page, loginParams);
    setHomeRoutes(page, homeParams);

    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, faker.internet.password());
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/home');

    const homePage = new HomePage(page);
  });
});
