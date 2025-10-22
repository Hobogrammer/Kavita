import {Chapter} from "src/app/_models/chapter";
import {MangaFile} from "src/app/_models/manga-file";
import {AgeRating} from "src/app/_models/metadata/age-rating";
import {Genre} from "src/app/_models/metadata/genre";
import {Person} from "src/app/_models/metadata/person";
import {PublicationStatus} from "src/app/_models/metadata/publication-status";
import {Tag} from "src/app/_models/tag";

export class ChapterBuilder {
  private chapter: Partial<Chapter> = {}

  setId(id: number): this {
    this.chapter.id = id;
    return this;
  }

  setTitle(title: string): this {
    this.chapter.title = title;
    return this;
  }

  setTitleName(titleName: string): this {
    this.chapter.titleName = titleName;
    return this;
  }

  setTitleNameLocked(titleNameLocked: boolean): this {
    this.chapter.titleNameLocked = titleNameLocked;
    return this;
  }

  setCount(count: number): this {
    this.chapter.count = count;
    return this;
  }

  setTotalCount(totalCount: number): this {
    this.chapter.totalCount = totalCount;
    return this;
  }

  setWordCount(wordCount: number): this {
    this.chapter.wordCount = wordCount;
    return this;
  }

  setCoverImage(imageUrl: string): this {
    this.chapter.coverImage = imageUrl;
    return this;
  }

  setVolumeId(volumeId: number): this {
    this.chapter.volumeId = volumeId;
    return this;
  }

  setVolumeTitle(volumeTitle: string): this {
    this.chapter.volumeTitle = volumeTitle;
    return this;
  }

  setCoverImageLocked(coverImageLocked: boolean): this {
    this.chapter.coverImageLocked = coverImageLocked;
    return this;
  }

  setRange(range: string): this {
    this.chapter.range = range;
    return this;
  }

  setMinNumber(minNumber: number): this {
    this.chapter.minNumber = minNumber;
    return this;
  }

  setMaxNumber(maxNumber: number): this {
    this.chapter.maxNumber = maxNumber;
    return this;
  }

  setSummary(summary: string): this {
    this.chapter.summary = summary;
    return this;
  }

  setSummaryLocked(summaryLocked: boolean): this {
    this.chapter.summaryLocked = summaryLocked;
    return this;
  }

  setIsSpecial(isSpecial: boolean): this {
    this.chapter.isSpecial = isSpecial;
    return this;
  }

  setPublicationStatus(publicationStatus: PublicationStatus): this {
    this.chapter.publicationStatus = publicationStatus;
    return this;
  }

  setLanguage(language: string): this {
    this.chapter.language = language;
    return this;
  }

  setLanguageLocked(languageLocked: boolean): this {
    this.chapter.languageLocked = languageLocked;
    return this;
  }

  addFiles(files: Array<MangaFile>):this {
    this.chapter.files = [...files];
    return this;
  }

  addPublishers(publishers: Array<Person>): this {
    this.chapter.publishers = [...publishers];
    return this;
  }

  setPublisherLocked(publisherLocked: boolean): this {
    this.chapter.publisherLocked = publisherLocked;
    return this;
  }

  addTags(tags: Array<Tag>): this {
    this.chapter.tags = [...tags];
    return this;
  }

  setTagsLocked(tagsLocked: boolean): this {
    this.chapter.tagsLocked = tagsLocked;
    return this;
  }

  addGenres(genres: Array<Genre>): this {
    this.chapter.genres = [...genres];
    return this;
  }

  setGenresLocked(genresLocked: boolean): this {
    this.chapter.genresLocked = genresLocked;
    return this;
  }

  addWriters(writers: Array<Person>): this {
    this.chapter.writers = [...writers];
    return this;
  }

  setWriterLocked(writerLocked: boolean): this {
    this.chapter.writerLocked = writerLocked;
    return this;
  }

  addCoverArtists(coverArtists: Array<Person>): this {
    this.chapter.coverArtists = [...coverArtists];
    return this;
  }

  setCoverArtistLocked(coverArtistLocked: boolean): this {
    this.chapter.coverArtistLocked = coverArtistLocked;
    return this;
  }

  addCharacters(characters: Array<Person>): this {
    this.chapter.characters = [...characters];
    return this;
  }

  setCharacterLocked(characterLocked: boolean): this {
    this.chapter.characterLocked = characterLocked;
    return this;
  }

  addPencillers(pencillers: Array<Person>): this {
    this.chapter.pencillers = [...pencillers];
    return this;
  }

  setPencillerLocked(pencillerLocked: boolean): this {
    this.chapter.pencillerLocked = pencillerLocked;
    return this;
  }

  addInkers(inkers: Array<Person>): this {
    this.chapter.inkers = [...inkers];
    return this;
  }

  setInkerLocked(inkerLocked: boolean): this {
    this.chapter.inkerLocked = inkerLocked;
    return this;
  }

  addImprints(imprints: Array<Person>): this {
    this.chapter.imprints = [...imprints];
    return this;
  }

  setImprintLocked(imprintLocked: boolean): this {
    this.chapter.imprintLocked = imprintLocked;
    return this;
  }

  addColorists(colorists: Array<Person>): this {
    this.chapter.colorists = [...colorists];
    return this;
  }

  setColoristLocked(coloristLocked: boolean): this {
    this.chapter.coloristLocked = coloristLocked;
    return this;
  }

  addLetterers(letterers: Array<Person>): this {
    this.chapter.letterers = [...letterers];
    return this;
  }

  setLettererLocked(lettererLocked: boolean): this {
    this.chapter.lettererLocked = lettererLocked;
    return this;
  }

  addEditors(editors: Array<Person>): this {
    this.chapter.editors = [...editors];
    return this;
  }

  setEditorLocked(editorLocked: boolean): this {
    this.chapter.editorLocked = editorLocked;
    return this;
  }

  addTranslators(translators: Array<Person>): this {
    this.chapter.translators = [...translators];
    return this;
  }

  setTranslatorLocked(translatorLocked: boolean): this {
    this.chapter.translatorLocked = translatorLocked;
    return this;
  }

  addTeams(teams: Array<Person>): this {
    this.chapter.teams = [...teams];
    return this;
  }

  setTeamLocked(teamLocked: boolean): this {
    this.chapter.teamLocked = teamLocked;
    return this;
  }

  addLocations(locations: Array<Person>): this {
    this.chapter.locations = [...locations];
    return this;
  }

  setLocationLocked(locationLocked: boolean): this {
    this.chapter.locationLocked = locationLocked;
    return this;
  }

  setAgeRating(ageRating: AgeRating): this {
    this.chapter.ageRating = ageRating;
    return this;
  }

  setAgeRatingLocked(ageRatingLocked: boolean): this {
    this.chapter.ageRatingLocked = ageRatingLocked;
    return this;
  }

  setIsbn(isbn: string): this {
    this.chapter.isbn = isbn;
    return this;
  }

  setIsbnLocked(isbnLocked: boolean): this {
    this.chapter.isbnLocked = isbnLocked;
    return this;
  }

  setSortOrder(sortOrder: number): this {
    this.chapter.sortOrder = sortOrder;
    return this;
  }

  setSortOrderLocked(sortOrderLocked: boolean): this {
    this.chapter.sortOrderLocked = sortOrderLocked;
    return this;
  }

  setReleaseDate(releaseDate: string): this {
    this.chapter.releaseDate = releaseDate;
    return this;
  }

  setReleaseDateLocked(releaseDateLocked: boolean): this {
    this.chapter.releaseDateLocked = releaseDateLocked;
    return this;
  }

  setPages(pages: number): this {
   this.chapter.pages = pages;
   return this;
  }

  setPagesRead(pagesRead: number): this {
    this.chapter.pagesRead = pagesRead;
    return this;
  }

  setCreatedUtc(createdUtc: string): this {
    this.chapter.createdUtc = createdUtc;
    return this;
  }

  setWebLinks(webLinks: string): this {
    this.chapter.webLinks = webLinks;
    return this;
  }

  setPrimaryColor(primaryColor: string): this {
    this.chapter.primaryColor = primaryColor;
    return this;
  }

  setSecondaryColor(secondaryColor: string): this {
    this.chapter.secondaryColor = secondaryColor;
    return this;
  }

  setYear(year: string): this {
    this.chapter.year = year;
    return this;
  }

  setLastReadingProgress(lastReadingProgress: string): this {
    this.chapter.lastReadingProgress = lastReadingProgress;
    return this;
  }

  setMinHoursToRead(minHoursToRead: number): this {
    this.chapter.minHoursToRead = minHoursToRead;
    return this;
  }

  setMaxHoursToRead(maxHoursToRead: number): this {
    this.chapter.maxHoursToRead = maxHoursToRead;
    return this;
  }

  setAvgHoursToRead(avgHoursToRead: number): this {
    this.chapter.avgHoursToRead = avgHoursToRead;
    return this;
  }

  build(): Chapter {
    return {...this.chapter} as Chapter;
  }
}
