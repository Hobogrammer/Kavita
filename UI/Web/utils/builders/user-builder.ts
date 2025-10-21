import {AgeRestriction} from "src/app/_models/metadata/age-restriction";
import {Preferences} from "src/app/_models/preferences/preferences";
import {User} from "src/app/_models/user";

export class UserBuilder {
  private user: Partial<User> = {}

  addRoles(roles: string[]): this {
    this.user.roles = [...roles];
    return this;
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

  setHasRunScrobbleEventGeneration(hasRunScrobbleEventGeneration: boolean): this {
    this.user.hasRunScrobbleEventGeneration = hasRunScrobbleEventGeneration;
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

  setUsername(username: string): this {
    this.user.username = username;
    return this;
  }

  setScrobbleEventGenerationRan(scrobbleEventGenerationRan: string): this {
    this.user.scrobbleEventGenerationRan = scrobbleEventGenerationRan;
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

}
