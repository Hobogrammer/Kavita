import {faker} from "@faker-js/faker";
import {AgeRating} from "../../src/app/_models/metadata/age-rating";
import {Genre} from "../../src/app/_models/metadata/genre";
import {Person} from "../../src/app/_models/metadata/person";
import {PublicationStatus} from "../../src/app/_models/metadata/publication-status";
import {SeriesMetadata} from "../../src/app/_models/metadata/series-metadata";
import {Tag} from "../../src/app/_models/tag";

export class SeriesMetadataBuilder {
  private seriesMetadata: Partial<SeriesMetadata> = {
    totalCount: 0,
    maxCount: 1,
    webLinks: "",
    language: faker.location.language().alpha2,
    releaseYear: faker.date.past().getFullYear(),
    publicationStatus: PublicationStatus.Completed,
    ageRating: AgeRating.Everyone,
    genres: [],
    tags: [],
    writers: [],
    coverArtists: [],
    publishers: [],
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
    releaseYearLocked: false,
    languageLocked: false,
    publicationStatusLocked: false
  }

  public setSeriesId(seriesId: number): this {
    this.seriesMetadata.seriesId = seriesId;
    return this;
  }

  setSummary(summary: string): this {
    this.seriesMetadata.summary = summary;
    return this;
  }

  setReleaseYear(releaseYear: number): this {
    this.seriesMetadata.releaseYear = releaseYear;
    return this;
  }

  setPublicationStatus(publicationStatus: PublicationStatus): this {
    this.seriesMetadata.publicationStatus = publicationStatus;
    return this;
  }

  setAgeRating(ageRating: AgeRating): this {
    this.seriesMetadata.ageRating = ageRating;
    return this;
  }

  setWebLinks(webLinks: string): this {
    this.seriesMetadata.webLinks = webLinks;
    return this;
  }

  setLanguage(language: string): this {
    this.seriesMetadata.language = language;
    return this;
  }

  setTotalCount(totalCount: number): this {
    this.seriesMetadata.totalCount = totalCount;
    return this;
  }

  setMaxCount(maxCount: number): this {
    this.seriesMetadata.maxCount = maxCount;
    return this;
  }

  addPublishers(publishers: Array<Person>): this {
    this.seriesMetadata.publishers = [...publishers];
    return this;
  }

  setPublisherLocked(publisherLocked: boolean): this {
    this.seriesMetadata.publisherLocked = publisherLocked;
    return this;
  }

  addTags(tags: Array<Tag>): this {
    this.seriesMetadata.tags = [...tags];
    return this;
  }

  setTagsLocked(tagsLocked: boolean): this {
    this.seriesMetadata.tagsLocked = tagsLocked;
    return this;
  }

  addGenres(genres: Array<Genre>): this {
    this.seriesMetadata.genres = [...genres];
    return this;
  }

  setGenresLocked(genresLocked: boolean): this {
    this.seriesMetadata.genresLocked = genresLocked;
    return this;
  }

  addWriters(writers: Array<Person>): this {
    this.seriesMetadata.writers = [...writers];
    return this;
  }

  setWritersLocked(writersLocked: boolean): this {
    this.seriesMetadata.writerLocked = writersLocked;
    return this;
  }

  addCoverArtists(coverArtists: Array<Person>): this {
    this.seriesMetadata.coverArtists = [...coverArtists];
    return this;
  }

  setCoverArtistLocked(coverArtistLocked: boolean): this {
    this.seriesMetadata.coverArtistLocked = coverArtistLocked;
    return this;
  }

  addCharacters(characters: Array<Person>): this {
    this.seriesMetadata.characters = [...characters];
    return this;
  }

  setCharacterLocked(characterLocked: boolean): this {
    this.seriesMetadata.characterLocked = characterLocked;
    return this;
  }

  addPencillers(pencillers: Array<Person>): this {
    this.seriesMetadata.pencillers = [...pencillers];
    return this;
  }

  setPencillerLocked(pencillerLocked: boolean): this {
    this.seriesMetadata.pencillerLocked = pencillerLocked;
    return this;
  }

  addInkers(inkers: Array<Person>): this {
    this.seriesMetadata.inkers = [...inkers];
    return this;
  }

  setInkerLocked(inkerLocked: boolean): this {
    this.seriesMetadata.inkerLocked = inkerLocked;
    return this;
  }

  addImprints(imprints: Array<Person>): this {
    this.seriesMetadata.imprints = [...imprints];
    return this;
  }

  setImprintLocked(imprintLocked: boolean): this {
    this.seriesMetadata.imprintLocked = imprintLocked;
    return this;
  }

  addColorists(colorists: Array<Person>): this {
    this.seriesMetadata.colorists = [...colorists];
    return this;
  }

  setColoristLocked(coloristLocked: boolean): this {
    this.seriesMetadata.coloristLocked = coloristLocked;
    return this;
  }

  addLetterers(letterers: Array<Person>): this {
    this.seriesMetadata.letterers = [...letterers];
    return this;
  }

  setLettererLocked(lettererLocked: boolean): this {
    this.seriesMetadata.lettererLocked = lettererLocked;
    return this;
  }

  addEditors(editors: Array<Person>): this {
    this.seriesMetadata.editors = [...editors];
    return this;
  }

  setEditorLocked(editorLocked: boolean): this {
    this.seriesMetadata.editorLocked = editorLocked;
    return this;
  }

  addTranslators(translators: Array<Person>): this {
    this.seriesMetadata.translators = [...translators];
    return this;
  }

  setTranslatorLocked(translatorLocked: boolean): this {
    this.seriesMetadata.translatorLocked = translatorLocked;
    return this;
  }

  addTeams(teams: Array<Person>): this {
    this.seriesMetadata.teams = [...teams];
    return this;
  }

  setTeamLocked(teamLocked: boolean): this {
    this.seriesMetadata.teamLocked = teamLocked;
    return this;
  }

  addLocations(locations: Array<Person>): this {
    this.seriesMetadata.locations = [...locations];
    return this;
  }

  setLocationLocked(locationLocked: boolean): this {
    this.seriesMetadata.locationLocked = locationLocked;
    return this;
  }

  build(): SeriesMetadata {
    return {...this.seriesMetadata} as SeriesMetadata;
  }
}
