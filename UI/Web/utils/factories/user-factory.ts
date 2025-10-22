import {faker} from "@faker-js/faker";
import {AgeRating} from "../../src/app/_models/metadata/age-rating";
import {AgeRestriction} from "../../src/app/_models/metadata/age-restriction";
import {PageLayoutMode} from "../../src/app/_models/page-layout-mode";
import {Preferences} from "../../src/app/_models/preferences/preferences";
import {User} from "../../src/app/_models/user";
import {UserBuilder} from "../builders/user-builder";
import {defaultSiteTheme} from "../playwright-utils";

export abstract class UserFactory {

  private constructor() {}

  private static ADMIN_ROLE: string = "Admin";
  private static LOGIN_ROLE: string = "Login";
  private static CHANGE_PASSWORD_ROLE: string = "ChangePassword";
  private static CHANGE_RESTRICTION_ROLE: string = "ChangeRestriction";
  private static ENGLISH_LOCALE: string = "en";

  public static createUser(): User {
   return new UserBuilder()
     .setUsername(faker.internet.username())
     .setEmail(faker.internet.email())
     .setApiKey(faker.string.uuid())
     .setRefreshToken(faker.string.uuid())
     .setAgeRestriction(this.createDefaultAgeRestriction())
     .setPreferences(this.createDefaultPreferences())
     .addRoles([
       this.LOGIN_ROLE,
       this.CHANGE_PASSWORD_ROLE
     ])
     .setHasRunScrobbleEventGeneration(false)
     .setScrobbleEventGenerationRan(new Date().toISOString())
     .build();
  }

  public static createAdmin(): User {
   return new UserBuilder()
     .setUsername(faker.internet.username())
     .setEmail(faker.internet.email())
     .setApiKey(faker.string.uuid())
     .setRefreshToken(faker.string.uuid())
     .setAgeRestriction(this.createDefaultAgeRestriction())
     .setPreferences(this.createDefaultPreferences())
     .addRoles([
       this.ADMIN_ROLE,
       this.LOGIN_ROLE,
       this.CHANGE_PASSWORD_ROLE,
       this.CHANGE_RESTRICTION_ROLE
     ])
     .setHasRunScrobbleEventGeneration(false)
     .setScrobbleEventGenerationRan(new Date().toISOString())
     .build();
  }
  private static createDefaultAgeRestriction(): AgeRestriction  {
    return {
      ageRating: AgeRating.NotApplicable,
      includeUnknowns: false,
    } as AgeRestriction;
  }

  private static createDefaultPreferences(): Preferences {
    return {
      theme: defaultSiteTheme,
      globalPageLayoutMode: PageLayoutMode.List,
      blurUnreadSummaries: false,
      promptForDownloadSize: false,
      noTransitions: false,
      collapseSeriesRelationships: false,
      shareReviews: false,
      locale: this.ENGLISH_LOCALE,
      aniListScrobblingEnabled: false,
      wantToReadSync: false
    } as Preferences;
  }
}
