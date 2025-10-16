import {AgeRating} from "src/app/_models/metadata/age-rating";
import {AgeRestriction} from "src/app/_models/metadata/age-restriction";
import {PageLayoutMode} from "src/app/_models/page-layout-mode";
import {Preferences} from "src/app/_models/preferences/preferences";
import {User} from "src/app/_models/user";
import {defaultSiteTheme} from "utils/playwright-utils";

export class UserBuilder {
  private user: Partial<User> = {
    refreshToken: 'aTotallyRealRefreshToken',
    apiKey: '12345',
    hasRunScrobbleEventGeneration: false,
    scrobbleEventGenerationRan: '',
    roles: [],
    preferences: this.createDefaultPreferences(),
    ageRestriction: this.createDefaultAgeRestriction()
  }

  setAgeRestriction(ageRestriction: AgeRestriction): this {
    this.user.ageRestriction = ageRestriction;
    return this;
  }
  setApiKey(apiKey: string): this {
    this.user.apiKey = apiKey;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setPreferences(preferences: Preferences): this {
    this.user.preferences = preferences;
    return this;
  }

  setRefreshToken(refreshToken: string): this {
    this.user.refreshToken = refreshToken;
    return this;
  }

  addRoles(roles: string[]): this {
    this.user.roles = [...roles];
    return this;
  }

  setUsername(username: string): this {
    this.user.username = username;
    return this;
  }

  build(): User {
    this.user.token = this.createJwt();
    return {...this.user} as User;
  }

  // Create a mostly complete JWToken
  // Final section (signature) is not generated
  private createJwt(): string {
    const currentTime = new Date();
    const tenDaysInSeconds = 24 * 60 * 60 * 10;
    const jwtHeader = { alg: "HS256", typ: "JWT" };
    const jwtPayload = {
      name: this.user.username,
      nameId: 1,
      role: this.user.roles,
      nbf: currentTime.getUTCSeconds(), // time before jwt must not be accepted
      exp: currentTime.getUTCSeconds() + tenDaysInSeconds, // expiration time on or after which jwt should not be accepted
      iat: currentTime.getUTCSeconds() // time at which token was issued
    };

    // Convert stringified JSON to base64 and join
    return [btoa(JSON.stringify(jwtHeader)), btoa(JSON.stringify(jwtPayload))].join('.');
  }

  private createDefaultAgeRestriction(): AgeRestriction  {
    return {
      ageRating: AgeRating.NotApplicable,
      includeUnknowns: false,
    } as AgeRestriction;
  }

  private createDefaultPreferences(): Preferences {
    return {
      theme: defaultSiteTheme,
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
  }
}
