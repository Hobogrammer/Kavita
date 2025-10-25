import { MangaFormat } from "src/app/_models/manga-format";
import { Genre } from "src/app/_models/metadata/genre";
import { Person } from "src/app/_models/metadata/person";
import { Series } from "src/app/_models/series";
import { Tag } from "src/app/_models/tag";
import { Volume } from "src/app/_models/volume";

// TODO: Implement an IHasCast Model
export class SeriesBuilder {
  private series: Partial<Series> = {}

  setId(id: number): this {
    this.series.id = id;
    return this;
  }

  setName(name: string): this {
    this.series.name = name;
    return this;
  }

  setNameLocked(nameLocked: boolean): this {
    this.series.nameLocked = nameLocked;
    return this;
  }

  setOriginalName(name: string): this {
    this.series.originalName = name;
    return this;
  }

  setLocalizedName(name: string): this {
    this.series.localizedName = name;
    return this;
  }

  setSortName(name: string): this {
    this.series.sortName = name;
    return this;
  }

  setPages(pages: number): this {
    this.series.pages = pages;
    return this;
  }

  setCoverImageLocked(coverImageLocked: boolean): this {
    this.series.coverImageLocked = coverImageLocked;
    return this;
  }

  setLibraryId(libraryId: number): this {
    this.series.libraryId = libraryId;
    return this;
  }

  setLibraryName(libraryName: string): this {
    // @ts-ignore
    this.series.libraryName = libraryName;
    return this;
  }

  setPagesRead(pagesRead: number): this {
    this.series.pagesRead = pagesRead;
    return this;
  }

  setLatestReadDate(latestReadDate: string): this {
    this.series.latestReadDate = latestReadDate;
    return this;
  }

  setLastChapterAdded(lastChapterAdded: string): this {
    this.series.lastChapterAdded = lastChapterAdded;
    return this;
  }

  setUserRating(rating: number): this {
    this.series.userRating = rating;
    return this;
  }

  setHasUserRated(userRated: boolean): this {
    this.series.hasUserRated = userRated;
    return this;
  }

  setFormat(format: MangaFormat): this {
    this.series.format = format;
    return this;
  }

  setCreated(created: string): this {
    this.series.created = created;
    return this;
  }

  setSortNameLocked(locked: boolean): this {
    this.series.sortNameLocked = locked;
    return this;
  }

  setLocalizedNameLocked(locked: boolean): this {
    this.series.localizedNameLocked = locked;
    return this;
  }

  setWordCount(wordCount: number): this {
    this.series.wordCount = wordCount;
    return this;
  }

  setMinHoursToRead(minHoursToRead: number): this {
    this.series.minHoursToRead = minHoursToRead;
    return this;
  }

  setMaxHoursToRead(maxHoursToRead: number): this {
    this.series.maxHoursToRead = maxHoursToRead;
    return this;
  }

  setAvgHoursToRead(avgHoursToRead: number): this {
    this.series.avgHoursToRead = avgHoursToRead;
    return this;
  }

  setFolderPath(path: string): this {
    this.series.folderPath = path;
    return this;
  }

  setLowestFolderPath(path: string): this {
    this.series.lowestFolderPath = path;
    return this;
  }

  setDontMatch(match: boolean): this {
    this.series.dontMatch = match;
    return this;
  }

  setIsBlacklisted(isBlacklisted: boolean): this {
    this.series.isBlacklisted = isBlacklisted;
    return this;
  }

  setCoverImage(coverImagePath: string): this {
    this.series.coverImage = coverImagePath;
    return this;
  }

  setPrimaryColor(color: string): this {
    this.series.primaryColor = color;
    return this;
  }

  setSecondaryColor(color: string): this {
    this.series.secondaryColor = color;
    return this;
  }
  setWebLinks(webLinks: string): this {
    // @ts-ignore
    this.series.webLinks = webLinks;
    return this;
  }
  addVolumes(volumes: Array<Volume>): this {
    this.series.volumes = [...volumes];
    return this;
  }

  addPublishers(publishers: Array<Person>): this {
    this.series.publishers = [...publishers];
    return this;
  }

  addTags(tags: Array<Tag>): this {
    // @ts-ignore
    this.series.tags = [...tags];
    return this;
  }

  addGenres(genres: Array<Genre>): this {
    // @ts-ignore
    this.series.genres = [...genres];
    return this;
  }
  addWriters(writers: Array<Person>): this {
    this.series.writers = [...writers];
    return this;
  }

  addCoverArtists(coverArtists: Array<Person>): this {
    this.series.coverArtists = [...coverArtists];
    return this;
  }
  addCharacters(characters: Array<Person>): this {
    this.series.characters = [...characters];
    return this;
  }
  addPencillers(pencillers: Array<Person>): this {
    this.series.pencillers = [...pencillers];
    return this;
  }
  addInkers(inkers: Array<Person>): this {
    this.series.inkers = [...inkers];
    return this;
  }
  addImprints(imprints: Array<Person>): this {
    this.series.imprints = [...imprints];
    return this;
  }
  addColorists(colorists: Array<Person>): this {
    this.series.colorists = [...colorists];
    return this;
  }
  addLetterers(letterers: Array<Person>): this {
    this.series.letterers = [...letterers];
    return this;
  }
  addEditors(editors: Array<Person>): this {
    this.series.editors = [...editors];
    return this;
  }
  addTranslators(translators: Array<Person>): this {
    this.series.translators = [...translators];
    return this;
  }
  addTeams(teams: Array<Person>): this {
    this.series.teams = [...teams];
    return this;
  }
  addLocations(locations: Array<Person>): this {
    this.series.locations = [...locations];
    return this;
  }
  build(): Series {
    return {...this.series} as Series;
  }
}
