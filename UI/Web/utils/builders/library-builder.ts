import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {Library, LibraryType} from "src/app/_models/library/library";

export class LibraryBuilder {
  private library: Partial<Library> = {}

  setId(id: number): this {
    this.library.id = id;
    return this;
  }

  setName(name: string): this {
    this.library.name = name;
    return this;
  }

  setType(type: LibraryType): this {
    this.library.type = type;
    return this;
  }

  addFolders(folders: Array<string>): this {
    this.library.folders = [...folders];
    return this;
  }

  addExcludePatterns(excludePatterns: Array<string>): this {
    this.library.excludePatterns = [...excludePatterns];
    return this;
  }

  addLibraryFileTypes(libraryFileTypes: Array<FileTypeGroup>): this {
    this.library.libraryFileTypes = [...libraryFileTypes];
    return this;
  }

  setCoverImage(coverImagePath: string): this {
    this.library.coverImage = coverImagePath;
    return this;
  }

  setFolderWatching(folderWatching: boolean): this {
    this.library.folderWatching = folderWatching;
    return this;
  }

  setIncludeInDashboard(includeInDashboard: boolean): this {
    this.library.includeInDashboard = includeInDashboard;
    return this;
  }

  setIncludeInRecommended(includeInRecommended: boolean): this {
    this.library.includeInRecommended = includeInRecommended;
    return this;
  }
  setManageCollections(manageCollections: boolean): this {
    this.library.manageCollections = manageCollections;
    return this;
  }
  setIncludeInSearch(includeInSearch: boolean): this {
    this.library.includeInSearch = includeInSearch;
    return this;
  }

  setAllowScrobbling(allowScrobbling: boolean): this {
    this.library.allowScrobbling = allowScrobbling;
    return this;
  }
  setCollapseSeriesRelationships(collapseSeriesRelationships: boolean): this {
    this.library.collapseSeriesRelationships = collapseSeriesRelationships;
    return this;
  }

  setAllowMetadataMatching(allowMetadataMatching: boolean): this {
    this.library.allowMetadataMatching = allowMetadataMatching;
    return this;
  }

  setEnableMetadata(enableMetadata: boolean): this {
    this.library.enableMetadata = enableMetadata;
    return this;
  }
  setRemovePrefixForSortName(removePrefixForSortName: boolean): this {
    this.library.removePrefixForSortName = removePrefixForSortName;
    return this;
  }
  setManageReadingLists(manageReadingLists: boolean): this {
    this.library.manageReadingLists = manageReadingLists;
    return this;
  }

  setLastScanned(lastScanned: string): this {
    this.library.lastScanned = lastScanned;
    return this;
  }

  build(): Library {
    // Verification here yea
    return {...this.library} as Library;
  }
}
