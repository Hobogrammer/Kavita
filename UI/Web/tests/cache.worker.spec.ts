import {test, expect} from '@playwright/test';
import { environment } from "src/environments/environment";

// Pre-setup required
// 1. Create or seed accounts
// 2. Login
// 3. Create or seed content
test("cache worker should be created on cache attempt", async ({page}) => {

  // mock data required to load the login page
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

  const currentTime = new Date();
  const tenDaysInSeconds = 24 * 60 * 60 * 10;
  const jwtHeader = { alg: "HS256", typ: "JWT" };
  const jwtPayload = {
    name: "admin",
    nameid: 1,
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
  const jwt = [btoa(JSON.stringify(jwtHeader)), btoa(JSON.stringify(jwtPayload))]; // Didn't sign the request but it doesn't seem to care
  // mock data required to load the dashboard
  await page.route(environment.apiUrl + 'account/login', async route => {
    const json = {
      username: 'admin',
      email: 'admin@test.com',
      token:  jwt.join('.'),
      refreshToken: 'CfDJ8NcfB1T7Sm1OrXAS0VcvzN+YhpLieymd6M/DGz3m1Rpeup4/iZVSkFUCCxQRQFZ2kc5bvWhr+Bbk/2jt/htk0PsONQ/7+Nan3Yobcd5NK0o8TsFr9iuFnJkRq+XDP3AU5jBOtQijB9HYNw+rFF9I2hb01G5I2kDaHfwsmK+tC039fxHvSbtZYS+E1bRvnmKpcQ==', // ask joe about this token
      apiKey: '12345',
      kavitaVersion: '0.8.7.0',
      preferences: [{
        theme: {
          id: 1,
          name: "Dark",
          normalizedName: "dark",
          fileName: "dark.scss",
          isDefault: true,
          provider: 1,
          previewUrls: [""],
          description: "Default theme shipped with Kavita",
          author: null,
          compatibleVersion: null,
          selector: "bg-dark"
        },
      }],
      ageRestriction: { ageRating: -1, includeUnknowns: false}
    };
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(json)})
  });

  await page.route(environment.apiUrl + 'plugin/version?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: '0.8.7.0'});
  });

  await page.route(environment.apiUrl + 'device', async route => {
    console.log('his dark devices')
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify("[]")});
  });

  await page.route(environment.apiUrl + 'license/valid-license?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.hubUrl + 'messages/negotiate?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify({"negotiateVersion":1,"connectionId":"CkiMkPYyP0yzWnGbPdQDpQ","connectionToken":"gMyUQzklsSovnbLmprJgPA","availableTransports":[{"transport":"WebSockets","transferFormats":["Text","Binary"]},{"transport":"ServerSentEvents","transferFormats":["Text"]},{"transport":"LongPolling","transferFormats":["Text","Binary"]}]})});
  });

  await page.route(environment.apiUrl + 'stream/dashboard?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([{"id":18,"name":"読んでいる本","isProvided":false,"order":0,"smartFilterEncoded":"name=%E8%AA%AD%E3%82%93%E3%81%A7%E3%81%84%E3%82%8B%E6%9C%AC&stmts=comparison%253D8%25C2%25A6field%253D7%25C2%25A6value%253D3%EF%BF%BDcomparison%253D0%25C2%25A6field%253D19%25C2%25A6value%253D3%EF%BF%BDcomparison%253D9%25C2%25A6field%253D20%25C2%25A6value%253D100%EF%BF%BDcomparison%253D1%25C2%25A6field%253D20%25C2%25A6value%253D0&sortOptions=sortField%3D7%C2%A6isAscending%3DFalse&limitTo=0&combination=1","smartFilterId":6,"streamType":4,"visible":true},{"id":75,"name":"読んでいる漫画","isProvided":false,"order":1,"smartFilterEncoded":"name=%E8%AA%AD%E3%82%93%E3%81%A7%E3%81%84%E3%82%8B%E6%BC%AB%E7%94%BB&stmts=comparison%253D3%25C2%25A6field%253D20%25C2%25A6value%253D100%EF%BF%BDcomparison%253D1%25C2%25A6field%253D20%25C2%25A6value%253D0%EF%BF%BDcomparison%253D0%25C2%25A6field%253D19%25C2%25A6value%253D5&sortOptions=sortField%3D7%C2%A6isAscending%3DFalse&limitTo=0&combination=1","smartFilterId":12,"streamType":4,"visible":true},{"id":20,"name":"Continue Reading","isProvided":false,"order":2,"smartFilterEncoded":"name=Continue%20Reading&stmts=comparison%253D0%25C2%25A6field%253D19%25C2%25A6value%253D4%EF%BF%BDcomparison%253D3%25C2%25A6field%253D20%25C2%25A6value%253D100%EF%BF%BDcomparison%253D1%25C2%25A6field%253D20%25C2%25A6value%253D0&sortOptions=sortField%3D7%C2%A6isAscending%3DFalse&limitTo=0&combination=1","smartFilterId":8,"streamType":4,"visible":true},{"id":14,"name":"Want to read","isProvided":false,"order":3,"smartFilterEncoded":"name=Want%20to%20read&stmts=comparison%253D3%25C2%25A6field%253D20%25C2%25A6value%253D1%EF%BF%BDcomparison%253D0%25C2%25A6field%253D26%25C2%25A6value%253Dtrue&sortOptions=sortField%3D9%C2%A6isAscending%3DTrue&limitTo=0&combination=1","smartFilterId":2,"streamType":4,"visible":true},{"id":2,"name":"recently-updated","isProvided":true,"order":4,"smartFilterEncoded":null,"smartFilterId":0,"streamType":2,"visible":true},{"id":3,"name":"newly-added","isProvided":true,"order":5,"smartFilterEncoded":null,"smartFilterId":0,"streamType":3,"visible":true}])});
  });

  await page.route(environment.apiUrl + 'scrobbling/token-expired?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify(false)});
  });

  await page.route(environment.apiUrl + 'stream/sidenav?**', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([{"id":17,"name":"Japanese","isProvided":false,"order":0,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":4,"visible":true,"libraryId":3,"library":{"id":3,"name":"Japanese","lastScanned":"2025-09-29T00:00:44.9015685","type":2,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":false,"manageReadingLists":false,"includeInSearch":true,"allowScrobbling":false,"folders":["/library"],"collapseSeriesRelationships":false,"libraryFileTypes":[2,3],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true}},{"id":98,"name":"Manga","isProvided":false,"order":1,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":4,"visible":true,"libraryId":5,"library":{"id":5,"name":"Manga","lastScanned":"2025-09-29T00:00:48.8383244","type":0,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":true,"manageReadingLists":true,"includeInSearch":true,"allowScrobbling":false,"folders":["/manga"],"collapseSeriesRelationships":false,"libraryFileTypes":[1,2],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true}},{"id":18,"name":"English","isProvided":false,"order":2,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":4,"visible":true,"libraryId":4,"library":{"id":4,"name":"English","lastScanned":"2025-09-29T00:00:47.067679","type":2,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":false,"manageReadingLists":false,"includeInSearch":true,"allowScrobbling":false,"folders":["/english"],"collapseSeriesRelationships":false,"libraryFileTypes":[2,3],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true}},{"id":1,"name":"want-to-read","isProvided":true,"order":3,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":8,"visible":true,"libraryId":0,"library":null},{"id":5,"name":"all-series","isProvided":true,"order":4,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":7,"visible":true,"libraryId":0,"library":null},{"id":2,"name":"collections","isProvided":true,"order":5,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":1,"visible":true,"libraryId":0,"library":null},{"id":4,"name":"bookmarks","isProvided":true,"order":6,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":3,"visible":true,"libraryId":0,"library":null},{"id":226,"name":"browse-authors","isProvided":true,"order":6,"smartFilterEncoded":null,"smartFilterId":0,"externalSourceId":0,"externalSource":null,"streamType":9,"visible":true,"libraryId":0,"library":null}])});
  });

  await page.route(environment.apiUrl + 'library/libraries', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify([{"id":4,"name":"English","lastScanned":"2025-09-29T00:00:47.067679","type":2,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":false,"manageReadingLists":false,"includeInSearch":true,"allowScrobbling":false,"folders":["/english"],"collapseSeriesRelationships":false,"libraryFileTypes":[2,3],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true},{"id":3,"name":"Japanese","lastScanned":"2025-09-29T00:00:44.9015685","type":2,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":false,"manageReadingLists":false,"includeInSearch":true,"allowScrobbling":false,"folders":["/library"],"collapseSeriesRelationships":false,"libraryFileTypes":[2,3],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true},{"id":5,"name":"Manga","lastScanned":"2025-09-29T00:00:48.8383244","type":0,"coverImage":null,"folderWatching":true,"includeInDashboard":true,"includeInRecommended":true,"manageCollections":true,"manageReadingLists":true,"includeInSearch":true,"allowScrobbling":false,"folders":["/manga"],"collapseSeriesRelationships":false,"libraryFileTypes":[1,2],"excludePatterns":[""],"allowMetadataMatching":true,"enableMetadata":true}])});
  });

  await page.route(environment.apiUrl + 'filter/decode', async route => {
    await route.fulfill({contentType: "application/json", status: 200, body: JSON.stringify({"id":0,"name":"読んでいる本","statements":[{"comparison":8,"field":7,"value":"3"},{"comparison":0,"field":19,"value":"3"},{"comparison":9,"field":20,"value":"100"},{"comparison":1,"field":20,"value":"0"}],"combination":1,"sortOptions":{"sortField":7,"isAscending":false},"limitTo":0})});
  });

  await page.goto('/login');

  await expect(page.getByLabel('Username')).toBeVisible();
  await page.getByPlaceholder("Username").fill('admin');
  await page.getByPlaceholder("Password").fill('adminadmin');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/home');

  // initially worker count should be 0
  expect(page.workers().length).toBe(0);

  //
});
