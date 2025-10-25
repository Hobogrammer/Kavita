import { IHasCast } from "src/app/_models/common/i-has-cast";
import { Person } from "src/app/_models/metadata/person";

export abstract class IHasCastBuilder {
  private object: Partial<IHasCast> = {}

  addWriters(writers: Array<Person>): this {
    this.object.writers = [...writers];
    return this;
  }

  setWriterLocked(writerLocked: boolean): this {
    this.object.writerLocked = writerLocked;
    return this;
  }

  addCoverArtists(coverArtists: Array<Person>): this {
    this.object.coverArtists = [...coverArtists];
    return this;
  }

  setCoverArtistLocked(coverArtistLocked: boolean): this {
    this.object.coverArtistLocked = coverArtistLocked;
    return this;
  }

  addCharacters(characters: Array<Person>): this {
    this.object.characters = [...characters];
    return this;
  }

  setCharacterLocked(characterLocked: boolean): this {
    this.object.characterLocked = characterLocked;
    return this;
  }

  addPencillers(pencillers: Array<Person>): this {
    this.object.pencillers = [...pencillers];
    return this;
  }

  setPencillerLocked(pencillerLocked: boolean): this {
    this.object.pencillerLocked = pencillerLocked;
    return this;
  }

  addInkers(inkers: Array<Person>): this {
    this.object.inkers = [...inkers];
    return this;
  }

  setInkerLocked(inkerLocked: boolean): this {
    this.object.inkerLocked = inkerLocked;
    return this;
  }

  addImprints(imprints: Array<Person>): this {
    this.object.imprints = [...imprints];
    return this;
  }

  setImprintLocked(imprintLocked: boolean): this {
    this.object.imprintLocked = imprintLocked;
    return this;
  }

  addColorists(colorists: Array<Person>): this {
    this.object.colorists = [...colorists];
    return this;
  }

  setColoristLocked(coloristLocked: boolean): this {
    this.object.coloristLocked = coloristLocked;
    return this;
  }

  addLetterers(letterers: Array<Person>): this {
    this.object.letterers = [...letterers];
    return this;
  }

  setLettererLocked(lettererLocked: boolean): this {
    this.object.lettererLocked = lettererLocked;
    return this;
  }

  addEditors(editors: Array<Person>): this {
    this.object.editors = [...editors];
    return this;
  }

  setEditorLocked(editorLocked: boolean): this {
    this.object.editorLocked = editorLocked;
    return this;
  }

  addTranslators(translators: Array<Person>): this {
    this.object.translators = [...translators];
    return this;
  }

  setTranslatorLocked(translatorLocked: boolean): this {
    this.object.translatorLocked = translatorLocked;
    return this;
  }

  addTeams(teams: Array<Person>): this {
    this.object.teams = [...teams];
    return this;
  }

  setTeamLocked(teamLocked: boolean): this {
    this.object.teamLocked = teamLocked;
    return this;
  }

  addLocations(locations: Array<Person>): this {
    this.object.locations = [...locations];
    return this;
  }

  setLocationLocked(locationLocked: boolean): this {
    this.object.locationLocked = locationLocked;
    return this;
  }
}
