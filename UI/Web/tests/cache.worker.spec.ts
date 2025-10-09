import {test, expect} from '@playwright/test';
import { Observable } from "rxjs";
import { Chapter } from "src/app/_models/chapter";
import { ChapterDetailPlus } from "src/app/_models/chapter-detail-plus";
import { DashboardStream } from "src/app/_models/dashboard/dashboard-stream";
import { StreamType } from "src/app/_models/dashboard/stream-type.enum";
import { FileTypeGroup } from "src/app/_models/library/file-type-group.enum";
import { Library, LibraryType } from "src/app/_models/library/library";
import { MangaFile } from "src/app/_models/manga-file";
import { MangaFormat } from "src/app/_models/manga-format";
import { AgeRating } from "src/app/_models/metadata/age-rating";
import { AgeRestriction } from "src/app/_models/metadata/age-restriction";
import { Person } from "src/app/_models/metadata/person";
import { PublicationStatus } from "src/app/_models/metadata/publication-status";
import { SeriesMetadata } from "src/app/_models/metadata/series-metadata";
import { PageLayoutMode } from "src/app/_models/page-layout-mode";
import { Preferences } from "src/app/_models/preferences/preferences";
import { SiteTheme } from "src/app/_models/preferences/site-theme";
import { Rating, RatingAuthority } from "src/app/_models/rating";
import { Series } from "src/app/_models/series";
import { HourEstimateRange } from "src/app/_models/series-detail/hour-estimate-range";
import { RelatedSeries } from "src/app/_models/series-detail/related-series";
import { SeriesDetail } from "src/app/_models/series-detail/series-detail";
import { SeriesDetailPlus } from "src/app/_models/series-detail/series-detail-plus";
import { SeriesGroup } from "src/app/_models/series-group";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { SideNavStreamType } from "src/app/_models/sidenav/sidenav-stream-type.enum";
import { Tag } from "src/app/_models/tag";
import { User } from "src/app/_models/user";
import { Volume } from "src/app/_models/volume";
import { ScrobbleProvider } from "src/app/_services/scrobbling.service";
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
      FileTypeGroup.Epub
    ],
    excludePatterns:[""],
    allowMetadataMatching:false,
    enableMetadata:true,
    removePrefixForSortName: true,
    manageReadingLists: false
  } as Library;

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
    count: 1
  } as SeriesGroup;

  const mockEpubSeriesTimeLeft = {
    minHours: 1,
    maxHours: 999,
    avgHours: 666
  } as HourEstimateRange;

  const mockPublisher = {
    id: 87,
    name: "Mock Publisher",
    description: "A mock publisher. Please don't send manuscripts",
    aliases: [],
    coverImageLocked: false,
    primaryColor: "",
    secondaryColor: "",
  } as Person;

  const mockWriter = {
    id: 56,
    name: "Arthur Bookington",
    description: "Probably puts words on pages" ,
    aliases: [],
    coverImageLocked: false,
    primaryColor: "",
    secondaryColor: "",
  } as Person;

  const mockTag = {
    id: 39,
    title: "Tag"
  } as Tag;

  const mockEpubSeriesMetadata = {
    seriesId: 1,
    summary: "All about TEST",

    totalCount: 0, // ask joe about this eventually
    maxCount: 1, // ask joe about this eventually

    genres: [],
    tags: [
      mockTag
    ],
    writers: [
      mockWriter,
    ],
    coverArtists: [],
    publishers: [
      mockPublisher
    ],
    characters: [],
    pencillers: [],
    inkers: [],
    imprints: [],
    colorists: [],
    letterers: [],
    editors: [],
    translators: [],
    teams: [],
    locations: [],
    ageRating: AgeRating.Everyone,
    releaseYear: 1988,
    language: "en",
    publicationStatus: PublicationStatus.Completed,
    webLinks: "",

    summaryLocked: false,
    genresLocked: false,
    tagsLocked: false,
    writerLocked: false,
    coverArtistLocked: false,
    publisherLocked: false,
    characterLocked: false,
    pencillerLocked: false,
    inkerLocked: false,
    imprintLocked: false,
    coloristLocked: false,
    lettererLocked: false,
    editorLocked: false,
    translatorLocked: false,
    teamLocked: false,
    locationLocked: false,
    ageRatingLocked: false,
    releaseYearLocked: false,
    languageLocked: false,
    publicationStatusLocked: false
  } as SeriesMetadata;

  const mockMangaFile = {
    id: 587,
    filePath:"/mockEpub/Test Series - Vol 1.epub",
    pages: 234,
    format: MangaFormat.EPUB,
    created: "2023-05-19T21:16:18.9677091",
    bytes: 10000
  } as MangaFile;

  const mockVolumeChapter = {
    id: 43,
    range: "-100000",
    number: "-100000",
    minNumber: -100000,
    maxNumber: -100000,
    files: [
      mockMangaFile
    ],
    coverImage: "cover.png",
    coverImageLocked: false,
    pages: 234,
    volumeId: 0,
    pagesRead: 0,
    isSpecial: false,
    title: "Book -100000",
    createdUtc: "2023-05-19T21:16:18.9677091",
    titleName: "Testing, the Beginning",
    summary: "Lets start TESTING",
    minHoursToRead: 1,
    maxHoursToRead: 999,
    avgHoursToRead: 666,
    ageRating: AgeRating.Everyone,
    releaseDate: "",
    wordCount: 45083,
    volumeTitle: "Testing, the Beginning",
    webLinks: "",
    isbn: "",
    lastReadingProgress: "",
    sortOrder: -10000,
    primaryColor: "#3E41FF",
    secondaryColor: "#FB513D",
    year: "1988",
    language: mockEpubSeriesMetadata.language,
    publicationStatus: PublicationStatus.Completed,
    count: 1,
    totalCount: 0,
    genres: [],
    tags: [
      mockTag
    ],
    writers: [
      mockWriter
    ],
    coverArtists: [],
    publishers: [
      mockPublisher
    ],
    characters: [],
    pencillers: [],
    inkers: [],
    imprints: [],
    colorists: [],
    letterers: [],
    editors: [],
    translators: [],
    teams: [],
    locations: [],
    summaryLocked: false,
    genresLocked: false,
    tagsLocked: false,
    writerLocked: false,
    coverArtistLocked: false,
    publisherLocked: false,
    characterLocked: false,
    pencillerLocked: false,
    inkerLocked: false,
    imprintLocked: false,
    coloristLocked: false,
    lettererLocked: false,
    editorLocked: false,
    translatorLocked: false,
    teamLocked: false,
    locationLocked: false,
    ageRatingLocked: false,
    languageLocked: false,
    isbnLocked: false,
    titleNameLocked: false,
    sortOrderLocked: false,
    releaseDateLocked: false,
  } as Chapter;

  const mockVolume = {
    id: 23,
    minNumber: 1,
    maxNumber: 1,
    name: "Testing, The Beginning",
    createdUtc: "2023-05-19T21:16:18.9677091",
    lastModifiedUtc: "2023-05-19T21:16:18.9677091",
    pages: 234,
    pagesRead: 0,
    wordCount: 0,
    chapters: [
      mockVolumeChapter
    ],
    timeEstimate: mockEpubSeriesTimeLeft,
    minHoursToRead: 1,
    maxHoursToRead: 999,
    avgHoursToRead: 666,

    coverImage: "cover.png",
    coverImageLocked: false,
    primaryColor: "",
    secondaryColor: "",
  } as Volume;

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
    volumes: [
      mockVolume
    ],
    webLinks: "", // not defined in Series object but required to successfully load
    publishers: [ // "    "       "   "     "     "    "       "    "           "
      mockPublisher
    ],
    tags: [
      mockTag
    ],
    writers: [
      mockWriter
    ],
    genres: [],
    coverArtists: [],
    characters: [],
    pencillers: [],
    inkers: [],
    imprints: [],
    colorists: [],
    letterers: [],
    editors: [],
    translators: [],
    teams: [],
    locations: [],
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

  // Fill in login form

  // initially worker count should be 0
  expect(page.workers().length).toBe(0);
  expect(page.url()).toBe('http://localhost:4200/home');
  await expect(page.getByRole('button', { name: mockUser.username })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home'})).toBeVisible();
  await expect(page.getByRole('link', { name: mockEpubLib.name})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Recently Updated Series'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Newly Added Series'})).toBeVisible();

  // mock api and data to load series page

  await page.route(environment.apiUrl + 'users/has-library-access?***', async route => {
    console.log("Serving Has-Library-Access");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(true)});
  });

  await page.route(environment.apiUrl + 'scrobbling/has-hold?*', async route => {
    console.log("Serving scrobbling hold");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'scrobbling/library-allows-scrobbling?*', async route => {
    console.log("Serving library allow scrobbling");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'series/metadata?*', async route => {
    console.log("Serving Series Metadata");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesMetadata)});
  });

  await page.route(environment.apiUrl + 'want-to-read?*', async route => {
    console.log("Serving Want to Read");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'readinglist/lists-for-series?*', async route => {
    console.log("Serving readinglist");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([])});
  });

  await page.route(environment.apiUrl + 'collection/all-series?*', async route => {
    console.log("Serving collection for series");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([])});
  });

  await page.route(environment.apiUrl + 'reader/series-bookmarks?*', async route => {
    console.log("Serving reader service series bookmarks");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([])});
  });

  await page.route(environment.apiUrl + 'reader/time-left?*', async route => {
    console.log("Serving writer service time left");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesTimeLeft)});
  });

  await page.route(environment.apiUrl + 'reader/has-progress?*', async route => {
    console.log("Serving reader service has progress");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'reader/continue-point?*', async route => {
    console.log("Serving continue point");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockVolumeChapter)});
  });

  await page.route(environment.apiUrl + 'library/type?*', async route => {
    console.log("Serving library service type");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubLib.type)});
  });

  await page.route(environment.apiUrl + 'series/*', async route => {
    console.log("Serving series service series");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeries)});
  });

  const mockEpubSeriesDetailPlus = {
    reviews: []
  } as SeriesDetailPlus;

  await page.route(environment.apiUrl + 'metadata/series-detail-plus?*', async route => {
    console.log("Serving metadata service series detail plus");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesDetailPlus)});
  });

  const mockEpubSeriesRelated = {
    sourceSeriesId: mockEpubSeries.id,
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

  await page.route(environment.apiUrl + 'series/all-related?*', async route => {
    console.log("Serving SeriesService related series");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesRelated)});
  });

  const mockEpubSeriesDetail = {
    specials: [],
    chapters: [],
    volumes: [
      mockVolume,
    ],
    storylineChapters: [],
    unreadCount: 1,
    totalCount: 1,
    publishers: [
      mockPublisher
    ]
  } as SeriesDetail;

  await page.route(environment.apiUrl + 'series/series-detail?*', async route => {
    console.log("Serving SeriesService series detail");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesDetail)});
  });

  const mockEpubSeriesRating = {
    averageScore: 0,
    meanScore: 0,
    favoriteCount: 0,
    provider: ScrobbleProvider.Kavita,
    providerUrl: undefined,
    authority: RatingAuthority.User
  } as Rating;

  await page.route(environment.apiUrl + 'rating/overall-series?*', async route => {
    console.log("Serving ReviewService overall rating");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesRating)});
  });

  await page.route(environment.apiUrl + 'image/series-cover?*', async route => {
    console.log("Serving ImageService cover");
    await route.fulfill({contentType: "image/png", status: 200, path: "src/assets/images/image-placeholder.dark.png"});
  });

  await page.route(environment.apiUrl + 'image/publisher?*', async route => {
    console.log('Serving ImageService publisher');
    await route.fulfill({contentType: "image/png", status: 200, path: "src/assets/images/ExternalServices/MAL.png"});
  });

  // Click on series to go to series page
  await page.locator('app-card-item').getByRole('link', { name: mockEpubSeries.name }).click()
  await page.waitForURL('/library/*/series/*');

  expect(page.url()).toBe('http://localhost:4200/library/' + mockEpubLib.id + '/series/' + mockEpubSeries.id);
  await expect(page.getByText(mockEpubLib.name)).toBeVisible();
  await expect(page.getByRole('link', { name: mockVolume.name })).toBeVisible();

  await page.route(environment.apiUrl + 'volume?*', async route => {
    console.log("Serving volume service volume");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockVolume)});
  });

  const mockChapterDetailPlus = {
    rating: 0,
    hasBeenRated: false,
    reviews: [],
    ratings: []
  } as ChapterDetailPlus;

  await page.route(environment.apiUrl + 'chapter/chapter-detail-plus?*', async route => {
    console.log("Serving chapter detail");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockChapterDetailPlus)});
  });

  await page.route(environment.apiUrl + 'readinglist/lists-for-chapter?*', async route => {
    console.log("Serving readinglist for chapter");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([])});
  });

  await page.route(environment.apiUrl + 'rating/overall-chapter?*', async route => {
    console.log("Serving rating service overall chapter");
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(mockEpubSeriesRating)});
  });

  await page.route(environment.apiUrl + 'image/volume-cover?*', async route => {
    console.log("Serving image service volume cover");
    await route.fulfill({contentType: "image/png", status: 200, path: "src/assets/images/image-placeholder.dark.png"});
  });

  await page.getByRole('link', { name: mockVolume.name }).click();
  await page.waitForURL('/library/*/series/*/volume/*');
  expect(page.url()).toBe('http://localhost:4200/library/' +
    mockEpubLib.id + '/series/' + mockEpubSeries.id + '/volume/' + mockVolume.id);
});
