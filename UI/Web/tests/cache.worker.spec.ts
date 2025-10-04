import {test, expect} from '@playwright/test';
import { Observable } from "rxjs";
import { DashboardStream } from "src/app/_models/dashboard/dashboard-stream";
import { StreamType } from "src/app/_models/dashboard/stream-type.enum";
import { FileTypeGroup } from "src/app/_models/library/file-type-group.enum";
import { Library, LibraryType } from "src/app/_models/library/library";
import { MangaFormat } from "src/app/_models/manga-format";
import { AgeRating } from "src/app/_models/metadata/age-rating";
import { AgeRestriction } from "src/app/_models/metadata/age-restriction";
import { PageLayoutMode } from "src/app/_models/page-layout-mode";
import { Preferences } from "src/app/_models/preferences/preferences";
import { SiteTheme } from "src/app/_models/preferences/site-theme";
import { Series } from "src/app/_models/series";
import { SeriesGroup } from "src/app/_models/series-group";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { SideNavStreamType } from "src/app/_models/sidenav/sidenav-stream-type.enum";
import { User } from "src/app/_models/user";
import {environment} from "src/environments/environment";

test("cache worker should be created on cache attempt", async ({page}) => {

  // mock api calls and data required to load the login page
  const mockTheme = {
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

  await page.route(environment.apiUrl + 'admin/exists', async route => {
   await route.fulfill({contentType: "application/json;", status: 200, body: 'true' });
  });

  await page.route(environment.apiUrl + 'theme', async route => {
    const themeResponse = [{id:1,name:"Dark",normalizedName:"dark",fileName:"dark.scss",isDefault:true,provider:1,previewUrls:[""],description:"Default theme shipped with Kavita","author":null,"compatibleVersion":null,"selector":"bg-dark"},{"id":2,"name":"e-ink","normalizedName":"eink","fileName":"e-ink.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-e-ink"},{"id":3,"name":"dracula-inspired","normalizedName":"draculainspired","fileName":"dracula-inspired.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-dracula-inspired"},{"id":4,"name":"e-inki","normalizedName":"einki","fileName":"e-inki.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-e-inki"},{"id":5,"name":"aquamarine-inspired","normalizedName":"aquamarineinspired","fileName":"aquamarine-inspired.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-aquamarine-inspired"},{"id":6,"name":"brilliance","normalizedName":"brilliance","fileName":"brilliance.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-brilliance"},{"id":7,"name":"cutepink","normalizedName":"cutepink","fileName":"cutepink.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-cutepink"},{"id":8,"name":"darknight","normalizedName":"darknight","fileName":"darknight.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-darknight"},{"id":9,"name":"darkpink","normalizedName":"darkpink","fileName":"darkpink.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-darkpink"},{"id":10,"name":"light","normalizedName":"light","fileName":"light.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-light"},{"id":11,"name":"nord","normalizedName":"nord","fileName":"nord.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-nord"},{"id":12,"name":"overseerr-inspired","normalizedName":"overseerrinspired","fileName":"overseerr-inspired.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-overseerr-inspired"},{"id":13,"name":"solarized-inspired","normalizedName":"solarizedinspired","fileName":"solarized-inspired.css","isDefault":false,"provider":2,"previewUrls":[""],"description":null,"author":null,"compatibleVersion":null,"selector":"bg-solarized-inspired"},{"id":14,"name":"Light","normalizedName":"light","fileName":"light.css","isDefault":false,"provider":2,"previewUrls":["https://raw.githubusercontent.com/Kareadita/Themes/main/Native%20Themes/Light/preview.png"],"description":"A light theme for those that don't like dark themes","author":"majora2007","compatibleVersion":"0.7.14","selector":"bg-light"},{"id":15,"name":"E-Ink","normalizedName":"eink","fileName":"e-ink.css","isDefault":false,"provider":2,"previewUrls":["https://raw.githubusercontent.com/Kareadita/Themes/main/Native%20Themes/E-Ink/preview.jpg"],"description":"A simplified theme for e-ink devices","author":"majora2007","compatibleVersion":"0.8.2","selector":"bg-e-ink"}];
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(themeResponse)});
  });

  await page.route(environment.apiUrl + 'locale', async route => {
    const localeResponse = [{"fileName":"ca","renderName":"català","translationCompletion":15.888554,"isRtL":false,"hash":"c2Ynlrb4QpXjEXtmDjGB3A=="},{"fileName":"cs","renderName":"čeština","translationCompletion":100,"isRtL":false,"hash":"mPL99VjLe9OGd7L3kMwndA=="},{"fileName":"da","renderName":"dansk","translationCompletion":21.310242,"isRtL":false,"hash":"p5E3bw4yIOB9qOw9P2yQ7Q=="},{"fileName":"de","renderName":"Deutsch","translationCompletion":98.53163,"isRtL":false,"hash":"L12KhEwgMbvKrZVzLOer8Q=="},{"fileName":"el","renderName":"Ελληνικά","translationCompletion":22.138554,"isRtL":false,"hash":"0ZE/11alxTIq8HznGe+6uA=="},{"fileName":"en","renderName":"English","translationCompletion":100,"isRtL":false,"hash":"Dk3HPHIH/9Q1sUmIsYdpjw=="},{"fileName":"es","renderName":"español","translationCompletion":87.7259,"isRtL":false,"hash":"vyZ4eTwA08Mes5awiW22+Q=="},{"fileName":"et","renderName":"eesti","translationCompletion":25.225904,"isRtL":false,"hash":"siudn3Suu57bfHEcb1FVbQ=="},{"fileName":"fi","renderName":"suomi","translationCompletion":10.316265,"isRtL":false,"hash":"Zbr41LCZWnxktulQuoaNug=="},{"fileName":"fr","renderName":"français","translationCompletion":100,"isRtL":false,"hash":"BilFDd52M8W/qv6QTfHXBg=="},{"fileName":"ga","renderName":"Gaeilge","translationCompletion":100,"isRtL":false,"hash":"ZRSx3iw/V4kH3d1VpSdDLw=="},{"fileName":"hi","renderName":"हिन्दी","translationCompletion":23.456326,"isRtL":false,"hash":"xK9QoEEo032MSIFZ134HvA=="},{"fileName":"hu","renderName":"magyar","translationCompletion":29.631025,"isRtL":false,"hash":"2iZwY4D2h0r+mJlo3Y5qrQ=="},{"fileName":"id","renderName":"Indonesia","translationCompletion":23.493975,"isRtL":false,"hash":"II3yNLPCtz7VP4bpjgOXzw=="},{"fileName":"it","renderName":"italiano","translationCompletion":90.09789,"isRtL":false,"hash":"81zgjp6BTu8gaeqgKSzIRQ=="},{"fileName":"ja","renderName":"日本語","translationCompletion":75.2259,"isRtL":false,"hash":"Ep9ywsrx+chQ/J7L9drtVA=="},{"fileName":"ko","renderName":"한국어","translationCompletion":95.06777,"isRtL":false,"hash":"3HlY0LDsVyyf7fCm1LpIZQ=="},{"fileName":"ms","renderName":"Melayu","translationCompletion":19.088856,"isRtL":false,"hash":"GK6mj/MMVUPqJfGyiawerg=="},{"fileName":"nb_NO","renderName":"norsk bokmål (Norge)","translationCompletion":17.54518,"isRtL":false,"hash":"WvSVAljaa4nRfgNods6Htg=="},{"fileName":"nl","renderName":"Nederlands","translationCompletion":55.45934,"isRtL":false,"hash":"BGYqjDDllQuVSer2gC0r0A=="},{"fileName":"pl","renderName":"polski","translationCompletion":100,"isRtL":false,"hash":"Oz3M3/rZfPF9P/fwLDtmwA=="},{"fileName":"pt","renderName":"português","translationCompletion":100,"isRtL":false,"hash":"RuxQtMEsO+zdxwX4jX2HZg=="},{"fileName":"pt_BR","renderName":"português (Brasil)","translationCompletion":100,"isRtL":false,"hash":"HUBbttCVKSd35juWaDMZhA=="},{"fileName":"ru","renderName":"русский","translationCompletion":34.600906,"isRtL":false,"hash":"4/sgkz5tj0Kdz++eIC37FQ=="},{"fileName":"sk","renderName":"slovenčina","translationCompletion":100,"isRtL":false,"hash":"cCQa+Pi0DVwYZh3WIhAkzQ=="},{"fileName":"sv","renderName":"svenska","translationCompletion":92.62048,"isRtL":false,"hash":"mTz1sJBi8MWzjp5BSzvYYQ=="},{"fileName":"ta","renderName":"தமிழ்","translationCompletion":83.65964,"isRtL":false,"hash":"x0eHfpZLRA2xncBvToWclg=="},{"fileName":"th","renderName":"ไทย","translationCompletion":33.58434,"isRtL":false,"hash":"dLqPDr4w5smUr/WrZzc45A=="},{"fileName":"tr","renderName":"Türkçe","translationCompletion":25.03765,"isRtL":false,"hash":"q/V6SIoVRvrG5edbmROZsw=="},{"fileName":"uk","renderName":"українська","translationCompletion":23.04217,"isRtL":false,"hash":"ggQc1Fvj9KyoAFycuHr/dA=="},{"fileName":"vi","renderName":"Tiếng Việt","translationCompletion":83.320786,"isRtL":false,"hash":"zK2JSQdvOXtP0HalJ0R0JQ=="},{"fileName":"zh_Hans","renderName":"中文（简体）","translationCompletion":100,"isRtL":false,"hash":"wjKGJqmn4w9XY9uBoR3apQ=="},{"fileName":"zh_Hant","renderName":"中文（繁體）","translationCompletion":100,"isRtL":false,"hash":"riXIY5EmWf8GZUTjD4lpig=="},{"fileName":"fa","renderName":"فارسی","translationCompletion":0.18825302,"isRtL":true,"hash":"yPDm41Y/u0cGf1RTrMvwJA=="},{"fileName":"he","renderName":"עברית","translationCompletion":0.9036144,"isRtL":true,"hash":"uNKpSTI7WpypGdqDk/WQYA=="}];
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(localeResponse)});
  });

  // mock data and api calls required to load home/the dashboard

  // TODO: Test helper object factory
  const mockEpubLib = {
    id: 1,
    name: "Epub Test",
    lastScanned: "2025-10-29t00:00:47.067679",
    type: LibraryType.Book,
    coverImage: null,
    folderWatching: false,
    includeInDashboard: true,
    includeInRecommended: true,
    manageCollections: false,
    includeInSearch: true,
    allowScrobbling: false,
    folders: [
      "/mockEpub"
    ],
    collapseSeriesRelationships:false,
    libraryFileTypes:[
      FileTypeGroup.Epub,
      FileTypeGroup.Pdf
    ],
    excludePatterns:[""],
    allowMetadataMatching:false,
    enableMetadata:true,
    removePrefixForSortName: true,
    manageReadingLists: false
  } as Library;

  const mockEpubSeriesDetail = {

  };

  const mockEpubSeriesGroup = {
    seriesName:"The Test Series",
    seriesId: 1,
    title: "The Test Series",
    libraryId: mockEpubLib.id,
    libraryType: mockEpubLib.type,
    created: "2025-09-26T18:38:45.6064843",
    chapterId: 0,
    volumeId: 0,
    id: 0,
    count: 2
  } as SeriesGroup;

  const mockEpubSeries = {
    id: mockEpubSeriesGroup.seriesId,
    name: mockEpubSeriesGroup.seriesName,
    originalName: mockEpubSeriesGroup.seriesName,
    localizedName: mockEpubSeriesGroup.seriesName,
    sortName: "Test Series, The",
    pages: 49,
    coverImageLocked: true,
    pagesRead: 0,
    latestReadDate: "2024-10-29T19:21:36.6603863",
    lastChapterAdded: "2025-09-26T18:38:45.5997689",
    userRating: 0,
    hasUserRated: false,
    format: MangaFormat.EPUB,
    created: mockEpubSeriesGroup.created,
    sortNameLocked: false,
    localizedNameLocked: false,
    wordCount: 99593,
    libraryId: mockEpubLib.id,
    libraryName: mockEpubLib.name,
    minHoursToRead: 3,
    maxHoursToRead: 10,
    avgHoursToRead: 4.947491,
    folderPath: "/mockEpub/The Test Series",
    lowestFolderPath: "/mockEpub/The Test Series",
    lastFolderScanned: "2025-09-26T18:44:16.2034692",
    dontMatch: false,
    isBlacklisted: false,
    coverImage: "series8773.png",
    primaryColor: "#633DFF",
    secondaryColor: "#F66E58",
    nameLocked: false,
    volumes: [],
  } as Series;

  // Create a mostly complete JWToken
  // Final section (signature) is not generated
  const currentTime = new Date();
  const tenDaysInSeconds = 24 * 60 * 60 * 10;
  const jwtHeader = { alg: "HS256", typ: "JWT" };
  const jwtPayload = {
    name: "admin",
    nameId: 1,
    role: [
      "Admin",
      "Change Password",
      "Change Restriction",
      "Login"
    ],
    nbf: currentTime.getUTCSeconds(), // time before jwt must not be accepted
    exp: currentTime.getUTCSeconds() + tenDaysInSeconds, // expiration time on or after which jwt should not be accepted
    iat: currentTime.getUTCSeconds() // time at which token was issued
  }

  const jwt = [btoa(JSON.stringify(jwtHeader)), btoa(JSON.stringify(jwtPayload))]; // Convert stringified JSON to base64

  const mockPrefs = {
    theme: mockTheme,
    globalPageLayoutMode: PageLayoutMode.List,
    blurUnreadSummaries: false,
    promptForDownloadSize: false,
    noTransitions: false,
    collapseSeriesRelationships: false,
    shareReviews: false,
    locale: "en",
    aniListScrobblingEnabled: false,
    wantToReadSync: false
  } as Preferences;

  const mockAgeRestriction = {
    ageRating: AgeRating.NotApplicable,
    includeUnknowns: false,
  } as AgeRestriction;

  const mockUser = {
    username: 'admin',
    email: 'admin@test.com',
    token:  jwt.join('.'),
    refreshToken: 'aTotallyRealRefreshToken',
    apiKey: '12345',
    kavitaVersion: '0.8.7.0',
    preferences: mockPrefs,
    ageRestriction: mockAgeRestriction,
    roles: [
      "Admin",
      "Change Password",
      "Change Restriction",
      "Login"
    ],
    hasRunScrobbleEventGeneration: false,
    scrobbleEventGenerationRan: ""
  } as User;

  await page.route(environment.apiUrl + 'account/login', async route => {
    console.log("Serving Login")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockUser)})
  });

  await page.route(environment.apiUrl + 'plugin/version?**', async route => {
    console.log("Serving Version")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify('0.8.7.0')});
  });

  await page.route(environment.apiUrl + 'device', async route => {
    console.log("Serving device");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([])});
  });

  await page.route(environment.apiUrl + 'license/valid-license?**', async route => {
    console.log("Serving License")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.hubUrl + 'messages/negotiate?**', async route => {
    console.log("Serving Messages")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify({"negotiateVersion":1,"connectionId":"CkiMkPYyP0yzWnGbPdQDpQ","connectionToken":"gMyUQzklsSovnbLmprJgPA","availableTransports":[{"transport":"WebSockets","transferFormats":["Text","Binary"]}]})});
  });

  await page.routeWebSocket('ws://'+ environment.hubUrl.slice(7) + 'messages?**', ws => {
    console.log("Serving on WebSocket");
    ws.onMessage(message => {
      switch (message) {
        case "{'protocol':'json','version':1}":
          ws.send(JSON.stringify({}));
          ws.send(JSON.stringify({"type":1,"target":"OnlineUsers","arguments":[["admin"]]}));
          break;
        default:
          ws.send("{}");
          break;
       }
    });
  });

  await page.route(environment.apiUrl + 'stream/dashboard?**', async route => {
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

    console.log("Serving Dashboard Streams")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([recentlyUpdated, newlyAdded])});
  });

  await page.route(environment.apiUrl + 'scrobbling/token-expired?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'stream/sidenav?**', async route => {
    const sideNav = {
      id: 2,
      name: mockEpubLib.name,
      isProvided: false,
      order: 1,
      smartFilterEncoded: undefined,
      smartFilterId: 0,
      streamType: SideNavStreamType.Library,
      externalSourceId: 0,
      externalSource: undefined,
      visible: true,
      libraryId: mockEpubLib.id,
      library: mockEpubLib
    } as SideNavStream;

    console.log("Serving Sidenav")
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([sideNav])});
  });

  await page.route(environment.apiUrl + 'library/libraries', async route => {
    console.log("Serving libraries");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([mockEpubLib])});
  });

  await page.route(environment.apiUrl + 'series/recently-updated-series', async route => {
    console.log("Serving recently updated");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([mockEpubSeriesGroup])});
  });

  await page.route(environment.apiUrl + 'series/recently-added-v2?*', async route => {
    console.log("Serving recently added");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([mockEpubSeries])});
  });

  await page.goto('/login');

  await expect(page.getByLabel('Username')).toBeVisible();
  await page.getByPlaceholder("Username").fill('admin');
  await page.getByPlaceholder("Password").fill('adminadmin');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/home');
  await page.waitForLoadState('load', {timeout: 10000} );

  // initially worker count should be 0
  expect(page.workers().length).toBe(0);
  expect(page.url()).toBe('http://localhost:4200/home');
  await page.pause();
  await expect(page.getByRole('button', { name: mockUser.username })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home'})).toBeVisible();
  await expect(page.getByRole('link', { name: mockEpubLib.name})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Recently Updated Series'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Newly Added Series'})).toBeVisible();
});
