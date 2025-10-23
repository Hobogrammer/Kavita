import { LibraryBuilder } from "../builders/library-builder";
import {Library, LibraryType } from "../../src/app/_models/library/library";
import { FileTypeGroup } from "../../src/app/_models/library/file-type-group.enum";
import { faker } from "@faker-js/faker";

export class LibraryFactory {
  private constructor() {}

  public static create(name: string, type: LibraryType, fileTypes: Array<FileTypeGroup>, folders: Array<string>): Library {
    return new LibraryBuilder()
      .setId(faker.number.int())
      .setName(name)
      .setType(type)
      .addFolders(folders)
      .addLibraryFileTypes(fileTypes)
      .addExcludePatterns([""])
      .setCoverImage(faker.image.url())
      .setFolderWatching(false)
      .setIncludeInDashboard(true)
      .setIncludeInRecommended(true)
      .setManageCollections(false)
      .setIncludeInSearch(true)
      .setAllowScrobbling(false)
      .setCollapseSeriesRelationships(false)
      .setAllowMetadataMatching(false)
      .setEnableMetadata(false)
      .setManageReadingLists(false)
      .setLastScanned(faker.date.past().toISOString())
      .build();
  }
}
