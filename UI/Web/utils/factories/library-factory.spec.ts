import {Library, LibraryType } from "../../src/app/_models/library/library";
import { FileTypeGroup } from "../../src/app/_models/library/file-type-group.enum";
import { LibraryFactory } from "./library-factory";

describe('LibraryFactory', () => {
  it('should create a new Library with specified libraryType, folders, and libraryFileTypes', () => {
    const expectedFolders: Array<string> = ["/books"];
    const expectedLibraryFileTypes: Array<FileTypeGroup> = [FileTypeGroup.Epub];
    const expectedLibraryType: LibraryType = LibraryType.Book;
    const expectedName: string = "A Library";

    const library: Library = LibraryFactory.create(expectedName,
      expectedLibraryType, expectedLibraryFileTypes, expectedFolders);

    expect(library).toBeDefined();
    expect(library.id).toBeDefined();
    expect(library.name).toBe(expectedName);
    expect(library.type).toBe(expectedLibraryType);
    expect(library.folders).toEqual(expectedFolders);
    expect(library.excludePatterns).toEqual([""])
    expect(library.coverImage).toBeDefined();
    expect(library.folderWatching).toEqual(false);
    expect(library.lastScanned).toBeDefined();
    expect(library.includeInSearch).toEqual(true);
    expect(library.includeInDashboard).toEqual(true);
    expect(library.includeInRecommended).toEqual(true);
    expect(library.enableMetadata).toEqual(false);
    expect(library.allowScrobbling).toEqual(false);
    expect(library.collapseSeriesRelationships).toEqual(false);
    expect(library.allowMetadataMatching).toEqual(false);
    expect(library.manageCollections).toEqual(false);
    expect(library.manageReadingLists).toEqual(false);
  });
});
