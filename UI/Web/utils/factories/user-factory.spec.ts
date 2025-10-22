import {UserFactory} from "./user-factory";
import {User} from "../../src/app/_models/user";
import {AgeRestriction} from "../../src/app/_models/metadata/age-restriction";
import {Preferences} from "../../src/app/_models/preferences/preferences";
import {defaultSiteTheme} from "../playwright-utils";
import {PageLayoutMode} from "../../src/app/_models/page-layout-mode";
import {AgeRating} from "../../src/app/_models/metadata/age-rating";
describe('UserFactory', () => {
  const expectedPref = {
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

  const expectedAgeRestriction = {
    ageRating: AgeRating.NotApplicable,
    includeUnknowns: false,
  } as AgeRestriction;

  it('createAdmin() should create an admin user', () => {
    const expectedRoles: Array<string> = ["Admin", "Login", "ChangePassword", "ChangeRestriction"]
    const user: User = UserFactory.createAdmin();

    expect(user.roles).toEqual(expectedRoles);
    expect(user.username).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.apiKey).toBeDefined();
    expect(user.scrobbleEventGenerationRan).toBeDefined();
    expect(user.hasRunScrobbleEventGeneration).toBe(false);
    expect(user.refreshToken).toBeDefined();
    expect(user.preferences).toEqual(expectedPref);
    expect(user.ageRestriction).toEqual(expectedAgeRestriction);
  });

  it('createUser() should create an regular user', () => {
    const expectedRoles: Array<string> = ["Login", "ChangePassword"]
    const user: User = UserFactory.createUser();

    expect(user.roles).toEqual(expectedRoles);
    expect(user.username).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.apiKey).toBeDefined();
    expect(user.scrobbleEventGenerationRan).toBeDefined();
    expect(user.hasRunScrobbleEventGeneration).toBe(false);
    expect(user.refreshToken).toBeDefined();
    expect(user.preferences).toEqual(expectedPref);
    expect(user.ageRestriction).toEqual(expectedAgeRestriction);
  });
});
